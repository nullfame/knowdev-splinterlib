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

function getStatRangeFromCardDetails(stat, cardDetails) {
  if (!cardDetails.stats) return {};
  const attributeStats = cardDetails.stats[stat];

  // Some cards (summoners) don't have levels so don't have an array
  if (!Array.isArray(attributeStats)) {
    return {
      high: attributeStats,
      low: attributeStats,
    };
  }

  // Reduce the array of stats to a single { high, low } object
  return attributeStats.reduce(
    (currentRange, myStat) => {
      /* eslint-disable no-param-reassign */
      if (myStat > currentRange.high) currentRange.high = myStat;
      if (myStat < currentRange.low) currentRange.low = myStat;
      return currentRange;
      /* eslint-enable no-param-reassign */
    },
    {
      high: attributeStats[0],
      low: attributeStats[0],
    }
  );
}

function getAllStatRanges(cardDetails) {
  const stats = Object.values(CARD.STAT);
  return stats.reduce((ranges, stat) => {
    // eslint-disable-next-line no-param-reassign
    ranges[stat] = getStatRangeFromCardDetails(stat, cardDetails);
    return ranges;
  }, {});
}

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
    this.statRange = getAllStatRanges(cardDetails);
  }
}

//
//
// Export
//

module.exports = CardTemplate;
