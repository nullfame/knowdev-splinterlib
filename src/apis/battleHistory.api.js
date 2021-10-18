const validate = require("@knowdev/arguments");
const HTTP = require("@knowdev/http");
const axios = require("axios").default;
const cloneDeep = require("lodash.clonedeep");

const { configuration } = require("../core");
const { CORE } = require("../util/constants");

//
//
// Main
//

const battleHistoryApi = async (
  player,
  {
    beforeBlock = CORE.BATTLE_HISTORY.BEFORE_BLOCK,
    limit = CORE.BATTLE_HISTORY.LIMIT,
    raw = false,
    types = CORE.BATTLE_HISTORY.TYPES,
    queryParams = {},
  } = {}
) => {
  //
  // Local import
  const { log } = configuration;

  //
  // Validate
  validate.string(player);
  validate.number(beforeBlock, { required: false });
  validate.number(limit);

  //
  // Setup
  const params = {
    before_block: beforeBlock,
    limit,
    types,
    username: player,
    ...queryParams,
  };
  log.debug.var({ battleHistoryApiParams: params });

  //
  // Preprocess
  const request = {
    method: HTTP.METHOD.GET,
    params,
    url: CORE.ENDPOINT.LEGACY.BATTLE_HISTORY,
  };

  //
  // Process
  const response = await axios(request);

  //
  // Postprocess
  const returnResults = cloneDeep(response.data);
  if (!raw) {
    returnResults.forEach((battle) => {
      /* eslint-disable no-param-reassign */
      battle.created_date = new Date(battle.created_date);
      battle.data = JSON.parse(battle.data);
      battle.result = JSON.parse(battle.result);
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

module.exports = battleHistoryApi;
