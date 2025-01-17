import fetchCardData from "./cards/fetchCardData.js";

let cardName = "opt";

const search = document.getElementById("search-card");
const cardSearchContainer = document.getElementsByClassName("card-container");

search.addEventListener("click", () => {
  showCard();
});

async function showCard() {
  let returnedCard = await fetchCardData(cardName);
  let cardImg = document.createElement("img");
  cardImg.className = returnedCard.name;
  cardImg.src = returnedCard.image_uris.normal;

  cardSearchContainer[0].appendChild(cardImg);
}
