import { test, expect, beforeEach, vi } from "vitest";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";
import fetchCardData from "../cards/fetchCardData.js";
import sortCard from "../cards/sortCard.js";

const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

beforeEach(async () => {
  const dom = new JSDOM(html, { runScripts: "dangerously" });
  global.window = dom.window;
  global.document = dom.window.document;

  // Mock fetchCardData function
  vi.mock("../cards/fetchCardData", () => ({
    __esModule: true,
    default: vi
      .fn()
      .mockResolvedValueOnce({
        name: "test-card",
        type_line: "Instant",
        image_uris: { normal: "http://example.com/test-card.jpg" },
      })
      .mockResolvedValueOnce({
        name: "test-card-2",
        type_line: "Creature",
        image_uris: { normal: "http://example.com/test-card-2.jpg" },
      }),
  }));

  // Mock sortCard function
  vi.mock("../cards/sortCard", () => ({
    __esModule: true,
    default: vi.fn(async (card) => ({
      zone: "creature",
      card: {
        ...card,
        image_uris: { small: "http://example.com/test-card-2-small.jpg" },
      },
    })),
  }));

  await import("../script.js");
});

test("clicking the button should create an img element", async () => {
  const searchButton = document.getElementById("search-card");
  searchButton.click();

  // Wait for the async function to complete
  await new Promise((resolve) => setTimeout(resolve, 100));

  const img = document.getElementById("Creature");

  expect(img).not.toBeNull();
  expect(img.src).toBe("http://example.com/test-card-2.jpg");
  expect(img.className).toBe("card-img");
});

test("clicking the button should call fetchCardData again if the card was an instant", async () => {
  const searchButton = document.getElementById("search-card");
  searchButton.click();

  await new Promise((resolve) => setTimeout(resolve, 100));

  expect(fetchCardData).toHaveBeenCalledTimes(2);
});
