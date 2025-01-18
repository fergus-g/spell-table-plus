import fetchCardData from "./fetchCardData.js";

export default async function sortCard(card) {
  if (!card || !card.type_line) {
    throw new Error("Invalid card object");
  }
  if (card.lang != "en") {
    const newCard = await fetchCardData();
    return sortCard(newCard);
  }

  console.log(`Sorting card: ${card.name} with type: ${card.type_line}`);

  if (card.type_line.includes("Creature")) {
    return { zone: "creature", card };
  }
  if (
    card.type_line.includes("Instant") ||
    card.type_line.includes("Sorcery")
  ) {
    console.log("Instant/Sorcery Hit, fetching new card...");
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

  throw new Error("Unknown card type");
}
