import uuid from 'uuid-v4';

export function GET({ cookies }) {
  const csrfToken = uuid();
  cookies.set('csrfToken', csrfToken, { httpOnly: true, secure: true, path: '/' });

  return new Response(csrfToken, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' }
  });
}