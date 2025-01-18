import {test, expect, vi} from "vitest";
import sortCard from "../../cards/sortCard";

test("sortCard should take in the card data from fetchCardData and create the card image in the right zone", () => {
    //Arrange
    let card = {
       "type_line": "Creature",
    }
    let expected = "Creature"
    //Act
    const act = sortCard(card)
    //Assert
    expect(act).toBe(expected)
});