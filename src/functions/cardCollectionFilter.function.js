const { force } = require("@knowdev/arguments");
const { CARD, FILTER } = require("../util/constants");

//
//
// Constants
//

//
//
// Helper Functions
//

/**
 * Does the card match the edition
 * @param {object} card
 * @param {string} edition from CARD.EDITION (e.g., "Alpha", "Untamed")
 * @returns boolean
 */
function isCardEdition(card, edition) {
  // Determine the "card edition index" (e.g., 1 for beta, 2 for promo, etc...)
  let cardEditionIndex = Number(card.editions);
  if (Number.isNaN(cardEditionIndex)) cardEditionIndex = card.editions;
  const cardEdition = CARD.EDITION.INDEX[cardEditionIndex];

  // If the edition parameter matches the card edition, we are good
  if (edition === cardEdition) return true;

  // If the edition passed in is alpha, match on alpha/beta cards
  if (edition === CARD.EDITION.ALPHA) {
    if (cardEdition === CARD.EDITION.ALPHA_BETA) return true;
  }

  // If the edition passed in is alpha/beta, match on alpha or beta cards
  if (edition === CARD.EDITION.ALPHA_BETA) {
    if (cardEdition === CARD.EDITION.ALPHA) return true;
    if (cardEdition === CARD.EDITION.BETA) return true;
  }

  // If this card is an alpha/beta, match both filters
  if (cardEdition === CARD.EDITION.ALPHA_BETA) {
    if (edition === CARD.EDITION.ALPHA) return true;
    if (edition === CARD.EDITION.BETA) return true;
  }

  return false;
}

//
//
// Main
//

const cardCollectionFilter =
  ({
    // ability = [],
    // abilityAnd = false,
    edition = [],
    format = undefined,
    mana = undefined,
    rarity = [],
    // splinter = [],
    // type = undefined,
  } = {}) =>
  (card) => {
    // Edition
    // eslint-disable-next-line no-param-reassign
    edition = force.array(edition);
    if (edition.length > 0) {
      for (let i = 0; i < edition.length; i += 1) {
        if (isCardEdition(card, edition[i])) {
          return true;
        }
      }
      return false;
    }

    // Format
    if (format) {
      if (!card.formats.includes(format)) return false;
    }

    // Mana (exact number)
    if (mana) {
      // Mana (exact number)
      if (typeof mana !== "object") {
        if (card.statRange.mana.low > mana) return false;
        if (card.statRange.mana.high < mana) return false;
      }
      // Mana (object)
      if (typeof mana === "object") {
        const comparisons = Object.keys(mana);
        for (let i = 0; i < comparisons.length; i += 1) {
          const comparison = comparisons[i];
          switch (comparison) {
            case FILTER.EQUALS:
              if (card.statRange.mana.low > mana[comparison]) return false;
              if (card.statRange.mana.high < mana[comparison]) return false;
              break;
            case FILTER.GREATER_THAN:
              if (mana[comparison] >= card.statRange.mana.high) return false;
              break;
            case FILTER.GREATER_THAN_OR_EQUAL:
              if (mana[comparison] > card.statRange.mana.high) return false;
              break;
            case FILTER.LESS_THAN:
              if (mana[comparison] <= card.statRange.mana.low) return false;
              break;
            case FILTER.LESS_THAN_OR_EQUAL:
              if (mana[comparison] < card.statRange.mana.low) return false;
              break;

            default:
              break;
          }
        }
      }
    }

    // Rarity
    // eslint-disable-next-line no-param-reassign
    rarity = force.array(rarity);
    if (rarity.length > 0) {
      // if (!card.rarity.includes(rarity)) return false;
      let match = false;
      for (let i = 0; i < rarity.length; i += 1) {
        if (card.rarity === rarity[i]) match = true;
      }
      if (!match) return false;
    }

    // Return true by default
    return true;
  };

//
//
// Export
//

module.exports = cardCollectionFilter;
