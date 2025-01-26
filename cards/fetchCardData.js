export default async function fetchCardData() {
  console.log("fetchCard Called");
  let url = `https://api.scryfall.com/cards/random`;
  let response = await fetch(url);
  let json = await response.json();

  return json;
}
