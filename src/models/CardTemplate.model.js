const getCardFormats = require("../functions/helpers/getCardFormats.function");
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
  constructor(cardDetails) {
    // Bail if nothing is passed in
    if (!cardDetails) return;

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
    this.edition = CARD.EDITION.INDEX[cardDetails.editions];
    this.formats = getCardFormats(this);
  }
}

//
//
// Export
//

module.exports = CardTemplate;
