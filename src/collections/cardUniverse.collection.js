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

  abilities() {
    return Array.from(
      Object.values(cards).reduce((abilityCatalog, card) => {
        // eslint-disable-next-line no-underscore-dangle
        const cardDetails = card._raw;
        if (cardDetails.stats.abilities) {
          for (let i = 0; i < cardDetails.stats.abilities.length; i += 1) {
            const abilityGained = cardDetails.stats.abilities[i];
            if (Array.isArray(abilityGained)) {
              for (let j = 0; j < abilityGained.length; j += 1) {
                const ability = abilityGained[j];
                abilityCatalog.add(ability);
              }
            } else {
              abilityCatalog.add(abilityGained);
            }
          }
        }
        return abilityCatalog;
      }, new Set())
    );
  }

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

  async refresh({ qa = false } = {}) {
    cards = mapCardsByIdFromArray(await cardDetailsApi({ qa }));
    return Object.values(cloneDeep(cards));
  }
}

//
//
// Export
//

module.exports = new Cards();
