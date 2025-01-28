import fetchCardData from "./cards/fetchCardData.js";
import sortCard from "./cards/sortCard.js";

const search = document.getElementById("search-card");
const searchCardContainer = document.getElementById("searched-card");
let searchedCard = {};
let playersHand = [];

search.addEventListener("click", () => {
  showCard();
});

async function showCard() {
  while (playersHand.length < 7) {
    let returnedCard = await fetchCardData();
    while (
      returnedCard.type_line.includes("Instant") ||
      returnedCard.type_line.includes("Sorcery")
    ) {
      returnedCard = await fetchCardData();
    }
    playersHand.push(returnedCard);
  }


  playersHand.forEach((card, index) => {
    let cardImg = document.createElement("img");
    cardImg.className = "card-img";
    cardImg.setAttribute("id", card.type_line);
    cardImg.src = card.image_uris.small;
    searchCardContainer.appendChild(cardImg);

    cardImg.addEventListener("click", async (event) => {
      event.target.remove();
      let { zone, card: sortedCard } = await sortCard(playersHand[index]);
      let cardContainer = document.getElementById(`${zone}-images`);
      let sortedCardImg = document.createElement("img");
      sortedCardImg.className = "card-img";
      sortedCardImg.setAttribute("id", sortedCard.type_line);
      sortedCardImg.src = sortedCard.image_uris.small;
      cardContainer.appendChild(sortedCardImg);
      playersHand.splice(index, 1);
      console.log(playersHand);
    });
  });

  searchedCard = playersHand[playersHand.length - 1];
}
