const cloneDeep = require("lodash.clonedeep");

const { BATTLE } = require("../util/constants");

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

class Battle {
  constructor(battle = {}) {
    // eslint-disable-next-line no-underscore-dangle
    this._raw = cloneDeep(battle);
    if (battle.created_date !== undefined) {
      if (typeof battle.created_date === "string") {
        this.createdDate = new Date(battle.created_date);
      } else {
        this.createdDate = battle.created_date;
      }
    }
    if (battle.result !== undefined) {
      let { result } = battle;
      if (typeof result === "string") {
        result = JSON.parse(result);
      }
      this.id = result.id;
      this.manaCap = result.mana_cap;
      this.winner = result.winner;
      this.loser = result.details.loser;
      this.rulesets = result.ruleset.split("|");
      this.type = result.match_type;
      if (result.details.is_brawl) this.type = BATTLE.TYPE.BRAWL;
      const player1 = result.players[0].name;
      const player2 = result.players[1].name;
      this.players = [player1, player2];
      this.teams = {};
      this.teams[player1] = {};
      // this.teams[player1].summoner = ;
      // console.log("team summoner :>> ", result.details.team1.summoner);
    }
  }
}

//
//
// Export
//

module.exports = Battle;
