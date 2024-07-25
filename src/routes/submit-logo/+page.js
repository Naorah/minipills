export async function load({ fetch }) {
  const response = await fetch('/api/logo_submission');
  const logos = await response.json();
  return { logos };
}