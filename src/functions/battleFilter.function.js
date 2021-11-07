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
    format = undefined,
    ignoreSurrender = true,
    league = undefined,
    loser = undefined,
    mana = undefined,
    manaPlusMinus = 0,
    ruleset = [],
    rulesetAnd = false,
    splinter = [],
    winner = undefined,
  } = {}) =>
  (battle) => {
    // Format
    if (format !== undefined && !battle.formats.includes(format)) return false;

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
    if (!Array.isArray(ruleset)) ruleset = [ruleset];
    if (ruleset.length > 0) {
      if (!rulesetAnd) {
        let found = false;
        ruleset.forEach((myRuleset) => {
          if (battle.rulesets.includes(myRuleset)) found = true;
        });
        if (!found) return false;
      } else {
        let foundAll = true;
        ruleset.forEach((myRuleset) => {
          if (!battle.rulesets.includes(myRuleset)) foundAll = false;
        });
        if (!foundAll) return false;
      }
    }

    // Splinters
    // eslint-disable-next-line no-param-reassign
    if (!Array.isArray(splinter)) splinter = [splinter];
    if (splinter.length > 0) {
      let matchedBoth = true;
      battle.players.forEach((player) => {
        if (!splinter.includes(battle.teams[player].splinter))
          matchedBoth = false;
      });
      if (!matchedBoth) return false;
    }

    // Winner and Loser
    if (loser && battle.loser !== loser) return false;
    if (winner && battle.winner !== winner) return false;

    // Ignore surrender
    if (ignoreSurrender && battle.surrender) return false;

    // Return true by default
    return true;
  };

//
//
// Export
//

module.exports = battleFilter;
