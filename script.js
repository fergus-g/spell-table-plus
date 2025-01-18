import fetchCardData from "./cards/fetchCardData.js";

const search = document.getElementById("search-card");
const cardSearchContainer = document.getElementsByClassName("card-container");

search.addEventListener("click", () => {
  showCard();
});

async function showCard() {

  const existingImg = cardSearchContainer[0].querySelector("img");
  if (existingImg) {
    cardSearchContainer[0].removeChild(existingImg);
  }
  let returnedCard = await fetchCardData();
  let cardImg = document.createElement("img");
  cardImg.className = returnedCard.name;
  cardImg.src = returnedCard.image_uris.small;
  cardSearchContainer[0].appendChild(cardImg);
}
