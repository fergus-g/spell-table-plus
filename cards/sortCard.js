export default async function sortCard(card) {
  if (card.type_line.includes( "Creature")) {
    return "creature";
  }
    if (card.type_line === "Instant") {
        return "instant";
    }
    if (card.type_line === "Sorcery") {
        return "sorcery";
    }
    if (card.type_line.includes("Artifact")) {
        return "artifact";
    }
    if (card.type_line.includes("Enchantment")) {
        return "enchantment";
    }
    if (card.type_line === "Planeswalker") {
        return "planeswalker";
    }
    if (card.type_line.includes("Land")) {
        return "land";
    }
}