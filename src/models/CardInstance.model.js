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

    // Merge template where there are no conflicts
    Object.keys(this.template).forEach((key) => {
      if (this[key] === undefined) this[key] = this.template[key];
    });
  }
}

//
//
// Export
//

module.exports = CardInstance;
