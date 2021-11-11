const cloneDeep = require("lodash.clonedeep");

const { ALL } = require("../../util/constants");
const removeIneligibleCardFormats = require("./removeIneligibleCardFormats.function");

//
//
// Function Definition
//

function getCardFormats(...cards) {
  const formats = cloneDeep(ALL.BATTLE.FORMATS);
  cards.forEach((card) => {
    removeIneligibleCardFormats(card, formats);
  });
  return formats;
}

//
//
// Export
//

module.exports = getCardFormats;
