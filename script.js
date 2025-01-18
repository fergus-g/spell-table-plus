import fetchCardData from "./cards/fetchCardData.js";
import sortCard from "./cards/sortCard.js";

const search = document.getElementById("search-card");

search.addEventListener("click", () => {
  showCard();
});

async function showCard() {
  let returnedCard = await fetchCardData();
  let { zone, card } = await sortCard(returnedCard);
  let cardContainer = document.getElementById(`${zone}-images`);

  // Create and assign the image only after a valid card type is determined
  let cardImg = document.createElement("img");
  cardImg.className = "card-img";
  cardImg.setAttribute("id", card.type_line);
  cardImg.src = card.image_uris.small;
  cardContainer.appendChild(cardImg);
}
