import { PILL_SUBMISSION_URL } from '$env/static/private';
import { PrismaClient } from '@prisma/client';
import { isHexColor } from '$lib/ColorUtil.js'
const prisma = new PrismaClient();

async function send_webhook_submission(display_name, name, color, discord_user) {
  // Webhook creation
  const payload = {
    embeds: [
      {
        title: 'New logo submission !',
        color: parseInt(color.replace('#', ''), 16),
        fields: [
          {
            name: '🎟️ Brand name',
            value: display_name + " ("+ name +")",
            inline: false,
          },
          {
            name: '🪧 Discord User',
            value: discord_user ? discord_user : "Anonymous",
            inline: false,
          },
          {
            name: '🧭 Status',
            value: "Pending",
            inline: false,
          }
        ],
        timestamp: new Date(),
      },
    ],
  };

  try {
    const response = await fetch(PILL_SUBMISSION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log('Embed sent successfully');
  } catch (error) {
    console.error('Error sending embed:', error);
  }
}

//
//
//
//
//
export async function GET() {
  try {
    // Récupérer les enregistrements avec Prisma
    const all_logos = await prisma.logoSubmission.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return new Response(JSON.stringify(all_logos), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
  }
}


//
//
// Création d'une submission
//
//
export async function POST({ request, cookies }) {
  try {
    const csrfToken = request.headers.get('x-csrf-token');
    const cookieToken = cookies.get('csrfToken');

    if (csrfToken !== cookieToken) {
      return new Response(JSON.stringify({ message: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const formData = await request.formData();
    const name = formData.get('name');
    const display_name = formData.get('display_name');
    const logoFile = formData.get('logo');
    const color = formData.get('color').replace('#', '');
    const discord = formData.get('discord') ? formData.get('discord') : null;

    if (!isHexColor(color)) {
      return new Response(JSON.stringify({ message: "Submission failed: Color is not valid" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Extract svg content
    const logo = await logoFile.text();

    // Submit the new logo
    const newLogoSubmission = await prisma.logoSubmission.create({
      data: {
        name,
        display_name,
        logo,
        color,
        discord,
      },
    });

    await send_webhook_submission(display_name, name, color, discord)

    return new Response(JSON.stringify(newLogoSubmission), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error.status);
    return new Response(JSON.stringify({ message: "Submission failed: Error in your svg file" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}