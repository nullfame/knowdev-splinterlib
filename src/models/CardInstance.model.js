const CardTemplate = require("./CardTemplate.model");
const { CARD, LEAGUE } = require("../util/constants");

//
//
// Constants
//

//
//
// Helper Functions
//

function determineSummonerLeague(card) {
  const rarityKey = CARD.RARITY.KEY[card.rarity];
  const league = Object.keys(LEAGUE.SUMMONER_CAPS[rarityKey]).reduce(
    (lastLeague, leagueCandidate) => {
      if (card.level >= LEAGUE.SUMMONER_CAPS[rarityKey][leagueCandidate])
        return leagueCandidate;
      return lastLeague;
    }
  );
  // Always return "Diamond" over "Champion"
  if (LEAGUE[league] === LEAGUE.CHAMPION) return LEAGUE.DIAMOND;
  return LEAGUE[league];
}

//
//
// Main
//

class CardInstance {
  // eslint-disable-next-line camelcase
  constructor({ uid, xp, gold, card_detail_id, level } = {}) {
    this.uid = uid;
    this.xp = xp;
    this.gold = gold;
    // eslint-disable-next-line camelcase
    this.id = card_detail_id;
    this.level = level;
    this.template = CardTemplate.get(this.id);
    this.edition = this.template.edition;

    // Merge template where there are no conflicts
    Object.keys(this.template).forEach((key) => {
      if (this[key] === undefined) this[key] = this.template[key];
    });

    // Get summoner league
    if (this.type === CARD.TYPE.SUMMONER) {
      this.league = determineSummonerLeague(this);
    }
  }
}

//
//
// Export
//

module.exports = CardInstance;
