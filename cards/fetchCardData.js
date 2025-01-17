export default async function fetchCardData(cardName) {
  let url = `https://api.scryfall.com/cards/named?fuzzy=${cardName}`;
  let response = await fetch(url);
  let json = await response.json();

  return json;
}
