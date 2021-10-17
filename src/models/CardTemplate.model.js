const cards = require("../collections/cardUniverse.collection");
const { CARD, SPLINTER } = require("../util/constants");

//
//
// Constants
//

//
//
// Helper Functions
//

//
//
// Main
//

class CardTemplate {
  constructor(cardDetails = {}) {
    // eslint-disable-next-line no-underscore-dangle
    this._raw = cardDetails;
    this.id = cardDetails.id;
    this.name = cardDetails.name;
    this.color = cardDetails.color;
    this.splinter = SPLINTER[cardDetails.color];
    this.type = cardDetails.type;
    this.rarityLevel = cardDetails.rarity;
    this.rarity = CARD.RARITY[cardDetails.rarity];
    this.isStarter = cardDetails.is_starter;
    this.edition = CARD.EDITION.LEVEL[cardDetails.editions];
  }
}

//
//
// Static
//

CardTemplate.get = (id) => new CardTemplate(cards.get(id));

//
//
// Export
//

module.exports = CardTemplate;
