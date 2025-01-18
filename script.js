import fetchCardData from "./cards/fetchCardData.js";
import sortCard from "./cards/sortCard.js";

const search = document.getElementById("search-card");
// const cardSearchContainer = document.getElementsByClassName("card-container");

search.addEventListener("click", () => {
  showCard();
});

async function showCard() {

  // const existingImg = cardSearchContainer[0].querySelector("img");
  // if (existingImg) {
  //   cardSearchContainer[0].removeChild(existingImg);
  // }
  let returnedCard = await fetchCardData();
  console.log("Fetched card:", returnedCard);
  let zone = await sortCard(returnedCard);
  console.log("Zone:", zone);
  let cardContainer = document.getElementById(`${zone}-heading`);
  if (!cardContainer) {
    console.error(`Element with id ${zone}-heading not found`); // Debugging statement
    return;
  }
  let cardImg = document.createElement("img");
  cardImg.className = returnedCard.name;
  let type = returnedCard.type_line
  cardImg.setAttribute("id", type);
  cardImg.src = returnedCard.image_uris.small;
  cardContainer.appendChild(cardImg);
}
