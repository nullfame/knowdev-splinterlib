const cards = require("../collections/cardUniverse.collection");
const { CARD, LEAGUE } = require("../util/constants");
const getCardFormats = require("../functions/helpers/getCardFormats.function");

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
  constructor({ uid, xp, gold, card_detail_id = 0, level, edition } = {}) {
    this.uid = uid;
    this.xp = xp;
    this.gold = gold;
    // eslint-disable-next-line camelcase
    this.id = card_detail_id;
    this.level = level;
    // eslint-disable-next-line camelcase
    this.template = cards.getTemplate(card_detail_id);
    this.edition = CARD.EDITION.INDEX[edition];

    // Merge template where there are no conflicts
    Object.keys(this.template).forEach((key) => {
      if (this[key] === undefined) this[key] = this.template[key];
    });

    // Override formats that came from the template (it will be more specific because the instance knows the difference between alpha and beta)
    this.formats = getCardFormats(this);

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
