import fetchCardData from "./cards/fetchCardData.js";
import sortCard from "./cards/sortCard.js";

const drawButton = document.getElementById("search-card");
const searchCardContainer = document.getElementById("searched-card");
let searchedCard = {};
let playersHand = [];

drawButton.addEventListener("click", () => {
  showCard();
});

async function showCard() {
  while (playersHand.length < 7) {
    let returnedCard = await fetchCardData();
    while (
      returnedCard.type_line.includes("Instant") ||
      returnedCard.type_line.includes("Sorcery") ||
      returnedCard.lang !== "en"
    ) {
      returnedCard = await fetchCardData();
    }
    playersHand.push(returnedCard);
  }

  playersHand.forEach((card, index) => {
    let cardImg = document.createElement("img");
    cardImg.className = "card-img";
    cardImg.setAttribute("id", card.type_line);
    cardImg.src = card.image_uris.normal;
    searchCardContainer.appendChild(cardImg);

    cardImg.addEventListener("click", async (event) => {
      event.target.remove();
     
      try {
        let { zone, card: sortedCard } = await sortCard(card);
    
        let cardContainer = document.getElementById(`${zone}-images`);
        let sortedCardImg = document.createElement("img");
        sortedCardImg.className = "card-img";
        sortedCardImg.setAttribute("id", sortedCard.type_line);
        sortedCardImg.src = sortedCard.image_uris.normal;
        cardContainer.appendChild(sortedCardImg);
        playersHand = playersHand.filter((c) => c !== card);
       
      } catch (error) {
        console.error("Error sorting card:", error);
      }
    });
  });

  searchedCard = playersHand[playersHand.length - 1];
}

const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector(".sidebar");

hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});
