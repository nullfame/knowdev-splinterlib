/* eslint-disable class-methods-use-this */
const cloneDeep = require("lodash.clonedeep");
const isNumber = require("lodash.isnumber");
const { envBoolean } = require("@knowdev/functions");

const cardDetailsApi = require("../apis/cardDetails.api");
const rawCardArray = require("../../data/cardDetails.json");
const CardTemplate = require("../models/CardTemplate.model");
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
    newCards[card.id] = new CardTemplate(card);
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

  all() {
    return Object.values(cloneDeep(cards));
  }

  getTemplate(id) {
    if (!id) return new CardTemplate();
    // eslint-disable-next-line no-param-reassign
    if (isNumber(id)) id = String(id);
    if (!Object.keys(cards).includes(id)) return new CardTemplate();
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
