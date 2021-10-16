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

const battleFilter =
  ({
    league = undefined,
    mana = undefined,
    manaPlusMinus = 0,
    rulesets = [],
    rulesetsAnd = false,
    splinters = [],
  } = {}) =>
  (battle) => {
    // Filter league
    if (league !== undefined) {
      if (battle.league !== league) return false;
    }

    // Filter mana
    if (mana !== undefined) {
      // if (battle.manaCap !== mana) return false;
      if (
        battle.manaCap < mana - manaPlusMinus ||
        battle.manaCap > mana + manaPlusMinus
      )
        return false;
    }

    // Rulesets
    // eslint-disable-next-line no-param-reassign
    if (!Array.isArray(rulesets)) rulesets = [rulesets];
    if (rulesets.length > 0) {
      if (!rulesetsAnd) {
        let found = false;
        rulesets.forEach((ruleset) => {
          if (battle.rulesets.includes(ruleset)) found = true;
        });
        if (!found) return false;
      } else {
        let foundAll = true;
        rulesets.forEach((ruleset) => {
          if (!battle.rulesets.includes(ruleset)) foundAll = false;
        });
        if (!foundAll) return false;
      }
    }

    // Splinters
    // eslint-disable-next-line no-param-reassign
    if (!Array.isArray(splinters)) splinters = [splinters];
    if (splinters.length > 0) {
      let matchedBoth = true;
      battle.players.forEach((player) => {
        if (!splinters.includes(battle.teams[player].splinter))
          matchedBoth = false;
      });
      if (!matchedBoth) return false;
    }

    // Return true by default
    return true;
  };

//
//
// Export
//

module.exports = battleFilter;
