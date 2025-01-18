import { test, expect, beforeEach, vi } from "vitest";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

beforeEach(async () => {
  const dom = new JSDOM(html, { runScripts: "dangerously" });
  global.window = dom.window;
  global.document = dom.window.document;

  // Mock fetchCardData function
  vi.mock("../cards/fetchCardData", () => ({
    __esModule: true,
    default: async () => ({
      name: "test-card",
      type_line: "Creature",
      image_uris: { small: "http://example.com/test-card.jpg" },
    }),
  }));

  // Mock sortCard function
  vi.mock("../cards/sortCard", () => ({
    __esModule: true,
    default: async (card) => ({
      zone: "creature",
      card,
    }),
  }));

  // Import the script after setting up the DOM and mocks
  await import("../script.js");
});

test("clicking the button should create an img element", async () => {
  const searchButton = document.getElementById("search-card");
  searchButton.click();

  // Wait for the async function to complete
  await new Promise((resolve) => setTimeout(resolve, 100));

  const img = document.querySelector("#creature-images img");
  expect(img).not.toBeNull();
  expect(img.src).toBe("http://example.com/test-card.jpg");
  expect(img.className).toBe("card-img");
});
