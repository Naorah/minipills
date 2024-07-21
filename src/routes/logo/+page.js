export async function load({ fetch }) {
  const response = await fetch('/api/logo');
  const icons = await response.json();
  return { icons };
}