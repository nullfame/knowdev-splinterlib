/* eslint-disable class-methods-use-this */
const { envBoolean } = require("@knowdev/functions");

const cardDetailsApi = require("../apis/cardDetails.api");
const rawCardArray = require("../../data/cardDetails.json");
const { CORE } = require("../util/constants");

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

    // If SPLINTERLIB_FETCH_CARDS, otherwise SPLINTERLIB_FETCH, refresh cards
    if (
      envBoolean(CORE.KEY.SPLINTERLIB_FETCH_CARDS, {
        defaultValue: envBoolean(CORE.KEY.SPLINTERLIB_FETCH, {
          defaultValue: false,
        }),
      })
    ) {
      this.refresh();
    }
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
