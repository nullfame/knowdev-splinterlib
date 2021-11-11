const pull = require("lodash.pull");
const { BATTLE, CARD, CORE } = require("../../util/constants");

//
//
// Function Definition
//

/**
 * Evaluates `card` and removes ineligible `formats`
 * * Has side effects on `formats
 */
function removeIneligibleCardFormats(card, formats) {
  if (
    card.edition !== CARD.EDITION.ALPHA &&
    card.edition !== CARD.EDITION.GLADIUS
  ) {
    pull(formats, BATTLE.FORMAT.ALPHA);
    if (card.edition !== CARD.EDITION.BETA) {
      pull(formats, BATTLE.FORMAT.ALPHA_BETA);
    }
  }
  if (!card.gold) {
    pull(formats, BATTLE.FORMAT.GOLD);
  }
  if (card.id < CORE.MODERN_FLOOR) {
    pull(formats, BATTLE.FORMAT.MODERN);
  }
  if (card.rarity === CARD.RARITY.LEGENDARY) {
    pull(formats, BATTLE.FORMAT.NO_LEGENDARIES);
    if (card.type === CARD.TYPE.SUMMONER) {
      pull(formats, BATTLE.FORMAT.NO_LEGENDARY_SUMMONERS);
    }
  }
  if (
    card.edition !== CARD.EDITION.UNTAMED &&
    card.edition !== CARD.EDITION.GLADIUS
  ) {
    pull(formats, BATTLE.FORMAT.UNTAMED);
    if (card.edition !== CARD.EDITION.DICE) {
      pull(formats, BATTLE.FORMAT.UNTAMED_DICE);
    }
  }
}

//
//
// Export
//

module.exports = removeIneligibleCardFormats;
