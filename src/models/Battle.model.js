const cloneDeep = require("lodash.clonedeep");

const CardInstance = require("./CardInstance.model");
const { BATTLE, LEAGUE, MAP } = require("../util/constants");

//
//
// Constants
//

//
//
// Helper Functions
//

function getTeam(team) {
  const returnTeam = {};
  returnTeam.rating = team.rating;
  returnTeam.color = team.color;
  returnTeam.splinter = MAP.COLOR[returnTeam.color];
  returnTeam.summoner = new CardInstance(team.summoner);
  returnTeam.monsters = [];
  team.monsters.forEach((monster) => {
    returnTeam.monsters.push(new CardInstance(monster));
  });
  return returnTeam;
}

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
      this.teams[player1] = getTeam(result.details.team1);
      this.teams[player2] = getTeam(result.details.team2);
      this.league = this.teams[player1].summoner.league;
      if (
        LEAGUE.LEVEL[this.teams[player2].summoner.league] >
        LEAGUE.LEVEL[this.teams[player1].summoner.league]
      ) {
        this.league = this.teams[player2].summoner.league;
      }
    }
  }
}

//
//
// Export
//

module.exports = Battle;
