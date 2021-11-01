/* eslint-disable class-methods-use-this */
const rawCardArray = require("../../data/cardDetails.json");
const cardDetailsApi = require("../apis/cardDetails.api");

//
//
// Constants
//

//
//
// Helper Functions
//

function mapCardsByIdFromArray(cardArray) {
  const newCards = {};

  cardArray.forEach((card) => {
    // TODO: new CardTemplate(card);
    newCards[card.id] = card;
  });

  return newCards;
}

//
//
// Local Variables
//

let cards;

//
//
// Main
//

class Cards {
  //
  //
  // Constructor
  //
  constructor() {
    cards = mapCardsByIdFromArray(rawCardArray);
  }

  //
  //
  // Functions
  //

  get(id) {
    return cards[id];
  }

  async refresh() {
    cards = mapCardsByIdFromArray(await cardDetailsApi());
  }
}

//
//
// Export
//

module.exports = new Cards();
