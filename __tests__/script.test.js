import { test, expect, beforeEach, vi } from "vitest";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

let window, document;

beforeEach(async () => {
  const dom = new JSDOM(html, { runScripts: "dangerously" });
  window = dom.window;
  document = window.document;
  global.document = document;
  global.window = window;

  // Mock fetchCardData function
  vi.mock("../cards/fetchCardData.js", () => ({
    __esModule: true,
    default: async () => ({
      name: "test-card",
      image_uris: { small: "http://example.com/test-card.jpg" },
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

  const img = document.querySelector(".card-container img");
  expect(img).not.toBeNull();
});

