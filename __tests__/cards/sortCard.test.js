import { test, expect, vi } from "vitest";
import sortCard from "../../cards/sortCard";
import fetchCardData from "../../cards/fetchCardData";

vi.mock("../../cards/fetchCardData.js");

const testCases = [
  {
    card: { type_line: "Creature", lang: "en" },
    expected: { zone: "creature", card: { type_line: "Creature", lang: "en" } },
  },
  {
    card: { type_line: "Instant", lang: "en" },
    fetchCard: { type_line: "Creature", lang: "en" },
    expected: { zone: "creature", card: { type_line: "Creature", lang: "en" } },
  },
  {
    card: { type_line: "Sorcery", lang: "en" },
    fetchCard: { type_line: "Artifact", lang: "en" },
    expected: { zone: "artifact", card: { type_line: "Artifact", lang: "en" } },
  },
  {
    card: { type_line: "Artifact", lang: "en" },
    expected: { zone: "artifact", card: { type_line: "Artifact", lang: "en" } },
  },
  {
    card: { type_line: "Enchantment", lang: "en" },
    expected: {
      zone: "enchantment",
      card: { type_line: "Enchantment", lang: "en" },
    },
  },
  {
    card: { type_line: "Planeswalker", lang: "en" },
    expected: {
      zone: "planeswalker",
      card: { type_line: "Planeswalker", lang: "en" },
    },
  },
  {
    card: { type_line: "Land", lang: "en" },
    expected: { zone: "land", card: { type_line: "Land", lang: "en" } },
  },
];

testCases.forEach(({ card, fetchCard, expected }) => {
  test(`sortCard should return the correct zone for type_line: ${card.type_line}`, async () => {
    if (fetchCard) {
      fetchCardData.mockResolvedValueOnce(fetchCard);
    }
    const result = await sortCard(card);
    expect(result).toEqual(expected);
  });
});

test("sortCard should call sortCard again if lang != en", async () => {
  // Arrange
  let card = {
    lang: "ja",
    type_line: "Instant",
  };
  let enCard = {
    lang: "en",
    type_line: "Creature",
  };

  fetchCardData.mockResolvedValueOnce(card).mockResolvedValueOnce(enCard);

  let expected = { zone: "creature", card: enCard };

  // Act
  const act = await sortCard(card);

  // Assert
  expect(act).toEqual(expected);
  //   expect(fetchCardData).toHaveBeenCalledTimes(2); // Ensure fetchCardData was called twice
});

test("sortCard should call sortCard again if type_line = Instant or Sorcery", async () => {
  // Arrange
  let card = {
    lang: "en",
    type_line: "Instant",
  };
  let cardS = {
    lang: "en",
    type_line: "Sorcery",
  };
  let enCard = {
    lang: "en",
    type_line: "Creature",
  };

  fetchCardData
    .mockResolvedValueOnce(card)
    .mockResolvedValueOnce(cardS)
    .mockResolvedValueOnce(enCard);

  let expected = { zone: "creature", card: enCard };

  // Act
  const act = await sortCard(card);

  // Assert
  expect(act).toEqual(expected);
  //   expect(fetchCardData).toHaveBeenCalledTimes(2); // Ensure fetchCardData was called twice
});

test("sortCard should return an error if the card type is not recognised", async () => {
  // Arrange
  let card = {
    type_line: "Creatu4e",
    lang: "en",
  };

  // Act & Assert
  await expect(sortCard(card)).rejects.toThrow("Unknown card type: Creatu4e");
});
