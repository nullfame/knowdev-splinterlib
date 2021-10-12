const rawCardArray = require("../../data/cardDetails.json");

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

class Cards {
  //
  //
  // Constructor
  //
  constructor() {
    const cards = {};

    rawCardArray.forEach((card) => {
      // TODO: new CardTemplate(card);
      cards[card.id] = card;
    });

    this.private = new WeakMap();
    this.private.set(this, { cards });
  }

  //
  //
  // Functions
  //

  get(id) {
    const { cards } = this.private.get(this);
    return cards[id];
  }
}

//
//
// Export
//

module.exports = new Cards();
