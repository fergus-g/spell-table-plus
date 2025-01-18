import fetchCardData from "./cards/fetchCardData.js";
import sortCard from "./cards/sortCard.js";

const search = document.getElementById("search-card");
const searchCardContainer = document.getElementById("searched-card");
let searchedCard = {};

search.addEventListener("click", () => {
  console.log("Im still active");
  showCard();
});

async function showCard() {
  let returnedCard = await fetchCardData();
  searchedCard = returnedCard;
  let { card } = await sortCard(returnedCard);
  // let cardContainer = document.getElementById(`${zone}-images`);

  // Create and assign the image only after a valid card type is determined
  let cardImg = document.createElement("img");
  cardImg.className = "card-img";
  cardImg.setAttribute("id", card.type_line);
  cardImg.src = card.image_uris.normal;
  searchCardContainer.appendChild(cardImg);
}

searchCardContainer.addEventListener("click", async () => {
  searchCardContainer.innerHTML = "";
  let { zone, card } = await sortCard(searchedCard);
  let cardContainer = document.getElementById(`${zone}-images`);

  // Create and assign the image only after a valid card type is determined
  let cardImg = document.createElement("img");
  cardImg.className = "card-img";
  cardImg.setAttribute("id", card.type_line);
  cardImg.src = card.image_uris.small;
  cardContainer.appendChild(cardImg);
});
