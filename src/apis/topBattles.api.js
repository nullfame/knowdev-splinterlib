const validate = require("@knowdev/arguments");
const HTTP = require("@knowdev/http");
const axios = require("axios").default;
const cloneDeep = require("lodash.clonedeep");

const { configuration } = require("../core");
const { CORE, LEAGUE } = require("../util/constants");

//
//
// Main
//

const topBattlesApi = async ({
  leaderboard = LEAGUE.LEADERBOARD.CHAMPION,
  limit = CORE.BATTLE_HISTORY.LIMIT,
  raw = false,
  queryParams = {},
} = {}) => {
  //
  // Local import
  const { log } = configuration;

  //
  // Validate
  validate.number(leaderboard);
  validate.number(limit);

  //
  // Setup
  const params = {
    leaderboard,
    limit,
    player: CORE.TOP_BATTLES_PLAYER,
    ...queryParams,
  };
  log.debug.var({ topBattlesApiParams: params });

  //
  // Preprocess
  const request = {
    method: HTTP.METHOD.GET,
    params,
    url: CORE.ENDPOINT.TOP_BATTLES,
  };

  //
  // Process
  const response = await axios(request);

  //
  // Postprocess
  const returnResults = cloneDeep(response.data);
  if (!raw) {
    returnResults.battles.forEach((battle) => {
      /* eslint-disable no-param-reassign */
      battle.created_date = new Date(battle.created_date);
      battle.settings = JSON.parse(battle.settings);
      battle.dec_info = JSON.parse(battle.dec_info);
      battle.player_1_data.join_date = new Date(battle.player_1_data.join_date);
      battle.player_1_data.guild_data = JSON.parse(
        battle.player_1_data.guild_data
      );
      battle.player_2_data.join_date = new Date(battle.player_2_data.join_date);
      battle.player_2_data.guild_data = JSON.parse(
        battle.player_2_data.guild_data
      );
      /* eslint-enable no-param-reassign */
    });
  }

  //
  // Return
  return returnResults;
};

//
//
// Export
//

module.exports = topBattlesApi;
