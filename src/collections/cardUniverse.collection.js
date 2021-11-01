const rawCardArray = require("../../data/cardDetails.json");

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

  // eslint-disable-next-line class-methods-use-this
  get(id) {
    return cards[id];
  }
}

//
//
// Export
//

module.exports = new Cards();
