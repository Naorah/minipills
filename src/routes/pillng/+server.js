// src/routes/pillng/+server.js
import sharp from 'sharp';

//
// create a png file
//
export async function GET({ url }) {
  try {
    // Convert SVG to PNG
    const response = await fetch(url.href.replace("pillng", 'pill'));

    let data = "";
    // Get the svg file
    if (response.ok) {
      data = await response.text();
    } else {
      return new Response('Error while creating the pill', { status: 500 });
    }

    // Creation d'une image bitmap avec sharp
    const pngImage = await sharp(Buffer.from(data))
      .resize({ height: 50, fit: 'inside' })
      .png()
      .toBuffer();

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