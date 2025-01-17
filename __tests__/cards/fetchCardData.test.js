import fetchCardData from "../../cards/fetchCardData";
import { test, expect, vi } from "vitest";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ name: "Black Lotus" }),
  })
);

test("fetchCardData returns card data", async () => {
  const cardName = "Black Lotus";
  const data = await fetchCardData(cardName);
  expect(data).toEqual({ name: "Black Lotus" });
});

test("fetchCardData calls the correct API endpoint", async () => {
  const cardName = "Black Lotus";
  await fetchCardData(cardName);
  expect(fetch).toHaveBeenCalledWith(
    `https://api.scryfall.com/cards/named?fuzzy=${cardName}`
  );
});

test("fetchCardData handles errors", async () => {
  fetch.mockImplementationOnce(() => Promise.reject("API is down"));
  const cardName = "Black Lotus";
  await expect(fetchCardData(cardName)).rejects.toEqual("API is down");
});
