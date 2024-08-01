// src/routes/pillng/+server.js
import sharp from 'sharp';
import { updateDailyPillStats } from '$lib/PillStats.js'

//
// create a png file
//
export async function GET({ url }) {
  // Convert SVG to PNG
  try {
    // get the right png param
    let url_svg_pill = url.href.replace("pillng", 'pill')
    if (url_svg_pill.includes('?')) url_svg_pill += "&pillng"
    else url_svg_pill += "?pillng"
    // call the api
    const response = await fetch(url_svg_pill);

    let data = "";
    // Get the svg file
    if (response.ok) {
      data = await response.text();
    } else {
      return new Response('Error while creating the pill', { status: 500 });
    }

    // Creation d'une image bitmap avec sharp
    const pngImage = await sharp(Buffer.from(data))
      .png()
      .toBuffer();

    // New pill created !
    await updateDailyPillStats("png");

    return new Response(pngImage, {
      headers: {
        'Content-Type': 'image/png'
      }
    });
  } catch (error) {
    console.error(error);
    return new Response('Error converting SVG to PNG', { status: 500 });
  }
}