import { test, expect, beforeEach, vi } from "vitest";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";
import fetchCardData from "../cards/fetchCardData.js";

const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

beforeEach(async () => {
  const dom = new JSDOM(html, { runScripts: "dangerously" });
  global.window = dom.window;
  global.document = dom.window.document;

  // Mock fetchCardData function
  vi.mock("../cards/fetchCardData", () => ({
    __esModule: true,
    default: vi.fn()
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
    default: async (card) => ({
      zone: "creature",
      card,
    }),
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
})

test("clicking the card should call sortCard", async () => {
  const searchButton = document.getElementById("search-card");
  searchButton.click();

  // Wait for the img element to be created
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Check if fetchCardData was called
  console.log("fetchCardData calls:", fetchCardData.mock.calls.length);

  // Check if the img element is created
  const img = document.getElementsByClassName("card-img")[0];
  console.log("Image element:", img);

  if (img) {
    img.click();
  } else {
    console.error("Image element not found");
  }

  await new Promise((resolve) => setTimeout(resolve, 100));

  expect(fetchCardData).toHaveBeenCalledTimes(2);
  expect(document.getElementById("creature-images").children.length).toBe(1);
});