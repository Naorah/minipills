export async function load({ fetch }) {
  const response = await fetch('/api/nb_logo');
  const nb_logo = await response.json();
  return { nb_logo };
}