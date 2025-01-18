import fetchCardData from "./fetchCardData.js";

export default async function sortCard(card) {
  if (card.lang != "en") {
    const newCard = await fetchCardData();
    return sortCard(newCard);
  }

  if (card.type_line.includes("Creature")) {
    return { zone: "creature", card };
  }
  if (
    card.type_line.includes("Instant") ||
    card.type_line.includes("Sorcery")
  ) {
    const newCard = await fetchCardData();
    return sortCard(newCard); // Recursively call sortCard with the new card
  }
  if (card.type_line.includes("Artifact")) {
    return { zone: "artifact", card };
  }
  if (card.type_line.includes("Enchantment")) {
    return { zone: "enchantment", card };
  }
  if (card.type_line.includes("Planeswalker")) {
    return { zone: "planeswalker", card };
  }
  if (card.type_line.includes("Land")) {
    return { zone: "land", card };
  }

  // If none of the conditions are met, throw an error
  throw new Error(`Unknown card type: ${card.type_line}`);
}
