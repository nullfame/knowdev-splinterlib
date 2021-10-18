const cloneDeep = require("lodash.clonedeep");
const pull = require("lodash.pull");

const CardInstance = require("./CardInstance.model");
const { BATTLE, CORE, LEAGUE, SPLINTER, CARD } = require("../util/constants");

//
//
// Constants
//

//
//
// Helper Functions
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

function getEligibleFormats(teams) {
  const formats = [
    BATTLE.FORMAT.ALPHA,
    BATTLE.FORMAT.ALPHA_BETA,
    BATTLE.FORMAT.GOLD,
    BATTLE.FORMAT.MODERN,
    BATTLE.FORMAT.NO_LEGENDARIES,
    BATTLE.FORMAT.NO_LEGENDARY_SUMMONERS,
    BATTLE.FORMAT.UNTAMED,
    BATTLE.FORMAT.UNTAMED_DICE,
    BATTLE.FORMAT.WILD,
  ];
  teams.forEach((team) => {
    removeIneligibleCardFormats(team.summoner, formats);
    team.monsters.forEach((monster) => {
      removeIneligibleCardFormats(monster, formats);
    });
  });
  return formats;
}

function getTeam(team) {
  if (team === null) return null;
  const returnTeam = {};
  returnTeam.rating = team.rating;
  returnTeam.color = team.color;
  returnTeam.splinter = SPLINTER[returnTeam.color];
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
    this.block = battle.block_num;
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
      if (result.details.type === BATTLE.TYPE.SURRENDER) this.surrender = true;
      const player1 = result.players[0].name;
      const player2 = result.players[1].name;
      this.players = [player1, player2];
      this.teams = {};
      this.teams[player1] = getTeam(result.details.team1);
      this.teams[player2] = getTeam(result.details.team2);
      if (this.teams[player1] !== null && this.teams[player2] !== null) {
        this.league = this.teams[player1].summoner.league;
        if (
          LEAGUE.LEVEL[this.teams[player2].summoner.league] >
          LEAGUE.LEVEL[this.teams[player1].summoner.league]
        ) {
          this.league = this.teams[player2].summoner.league;
        }
        this.formats = getEligibleFormats([
          this.teams[player1],
          this.teams[player2],
        ]);
      }
    }
  }
}

//
//
// Export
//

module.exports = Battle;
