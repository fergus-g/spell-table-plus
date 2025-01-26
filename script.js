import fetchCardData from "./cards/fetchCardData.js";
import sortCard from "./cards/sortCard.js";

const search = document.getElementById("search-card");
const searchCardContainer = document.getElementById("searched-card");
let searchedCard = {};

search.addEventListener("click", () => {
  if (Object.keys(searchedCard).length === 0) {
    showCard();
  }
});

async function showCard() {
  let returnedCard = await fetchCardData();

  while (
    returnedCard.type_line.includes("Instant") ||
    returnedCard.type_line.includes("Sorcery")
  ) {
    returnedCard = await fetchCardData();
  }

  searchedCard = returnedCard;
  let cardImg = document.createElement("img");
  cardImg.className = "card-img";
  cardImg.setAttribute("id", returnedCard.type_line);
  cardImg.src = returnedCard.image_uris.normal;
  searchCardContainer.appendChild(cardImg);
}

searchCardContainer.addEventListener("click", async () => {
  searchCardContainer.innerHTML = "";
  let { zone, card } = await sortCard(searchedCard);
  let cardContainer = document.getElementById(`${zone}-images`);
  let cardImg = document.createElement("img");
  cardImg.className = "card-img";
  cardImg.setAttribute("id", card.type_line);
  cardImg.src = card.image_uris.small;
  cardContainer.appendChild(cardImg);
  searchedCard = {};
});
