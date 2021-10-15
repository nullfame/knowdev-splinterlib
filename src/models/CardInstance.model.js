const CardTemplate = require("./CardTemplate.model");

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

class CardInstance {
  // eslint-disable-next-line camelcase
  constructor({ uid, xp, gold, card_detail_id, level, edition } = {}) {
    this.uid = uid;
    this.xp = xp;
    this.gold = gold;
    // eslint-disable-next-line camelcase
    this.id = card_detail_id;
    this.level = level;
    this.edition = edition;
    this.template = CardTemplate.get(this.id);
  }
}

//
//
// Export
//

module.exports = CardInstance;
