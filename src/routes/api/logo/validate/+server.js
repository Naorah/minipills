import { PILL_VALIDATION_URL } from '$env/static/private';
import { PrismaClient } from '@prisma/client';
import { isHexColor } from '$lib/ColorUtil.js'
const prisma = new PrismaClient();

async function send_webhook_validation(display_name, name, color, discord_user) {
  // Webhook creation
  const payload = {
    embeds: [
      {
        title: '✅ Logo validation ! ✅',
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
            value: "Added",
            inline: false,
          }
        ],
        timestamp: new Date(),
      },
    ],
  };

  try {
    const response = await fetch(PILL_VALIDATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error sending embed:', error);
  }
}

//
//
// VALIDATION DE LOGO
//
//
export async function POST({ request, cookies }) {

  try {
    // Récupération des paramètres
    const formData = await request.formData();
    const logo_string = formData.get('logo');
    const logo = JSON.parse(logo_string);
    // token csrf
    const csrfToken = request.headers.get('x-csrf-token');
    const cookieToken = cookies.get('csrfToken');

    // Validation du token csrf
    if (csrfToken !== cookieToken) {
      return new Response(JSON.stringify({ message: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log(logo.id)

    console.log("LETS UPDATE")

    const result = await prisma.LogoSubmission.update({
      where: { id: parseInt(logo.id, 10) },
      data: { validated_at: new Date() },
    });

    console.log("UPDATED")

    await send_webhook_validation(logo.display_name, logo.name, logo.color, logo.discord)

    // Exemple de réponse
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error.status);
    return new Response(JSON.stringify({ message: "Validation failed" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}