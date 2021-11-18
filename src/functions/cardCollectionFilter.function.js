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
  // If the edition parameter matches the card edition, we are good
  if (card.edition === edition) return true;

  // If the edition passed in is alpha, match on alpha/beta cards
  if (edition === CARD.EDITION.ALPHA) {
    if (card.edition === CARD.EDITION.ALPHA_BETA) return true;
  }

  // If the edition passed in is alpha/beta, match on alpha or beta cards
  if (edition === CARD.EDITION.ALPHA_BETA) {
    if (card.edition === CARD.EDITION.ALPHA) return true;
    if (card.edition === CARD.EDITION.BETA) return true;
  }

  // If this card is an alpha/beta, match both filters
  if (card.edition === CARD.EDITION.ALPHA_BETA) {
    if (edition === CARD.EDITION.ALPHA) return true;
    if (edition === CARD.EDITION.BETA) return true;
  }

  // Default false
  return false;
}

//
//
// Main
//

const cardCollectionFilter =
  ({
    ability = [],
    abilityAnd = false,
    edition = [],
    format = undefined,
    mana = undefined,
    name = undefined,
    nameMatchAny = false,
    rarity = [],
    splinter = [],
    type = undefined,
  } = {}) =>
  (card) => {
    // Ability
    // eslint-disable-next-line no-param-reassign
    ability = force.array(ability);
    if (ability.length > 0) {
      let match = false;
      for (let i = 0; i < ability.length; i += 1) {
        if (card.abilities.includes(ability[i])) {
          match = true;
          // if we didn't match and this is an and search, return false
        } else if (abilityAnd) return false;
      }
      if (!match) return false;
    }

    // Edition
    // eslint-disable-next-line no-param-reassign
    edition = force.array(edition);
    if (edition.length > 0) {
      let match = false;
      for (let i = 0; i < edition.length; i += 1) {
        if (isCardEdition(card, edition[i])) {
          match = true;
        }
      }
      if (!match) return false;
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

    // Name
    if (name) {
      // eslint-disable-next-line no-param-reassign
      name = name.toLowerCase();
      const words = card.name.toLowerCase().split(" ");
      let match = false;
      for (let i = 0; i < words.length; i += 1) {
        const word = words[i];
        if (nameMatchAny) {
          if (word.includes(name)) match = true;
        } else if (word.startsWith(name)) match = true;
      }
      if (!match) return false;
    }

    // Rarity
    // eslint-disable-next-line no-param-reassign
    rarity = force.array(rarity);
    if (rarity.length > 0) {
      let match = false;
      for (let i = 0; i < rarity.length; i += 1) {
        if (card.rarity === rarity[i]) match = true;
      }
      if (!match) return false;
    }

    // Splinter
    // eslint-disable-next-line no-param-reassign
    splinter = force.array(splinter);
    if (splinter.length > 0) {
      let match = false;
      for (let i = 0; i < splinter.length; i += 1) {
        if (card.splinter === splinter[i]) match = true;
      }
      if (!match) return false;
    }

    // Type
    if (type) {
      if (card.type !== type) return false;
    }

    // Return true by default
    return true;
  };

//
//
// Export
//

module.exports = cardCollectionFilter;
