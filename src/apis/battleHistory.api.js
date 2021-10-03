const validate = require("@knowdev/arguments");
const HTTP = require("@knowdev/http");
const axios = require("axios").default;

const { configuration } = require("../core");
const { BATTLE_HISTORY, ENDPOINT } = require("../util/constants");

//
//
// Main
//

const battleHistoryApi = async (
  player,
  {
    beforeBlock = BATTLE_HISTORY.BEFORE_BLOCK,
    limit = BATTLE_HISTORY.LIMIT,
    types = BATTLE_HISTORY.TYPES,
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
    url: ENDPOINT.LEGACY.BATTLE_HISTORY,
  };

  //
  // Process
  const response = await axios(request);

  //
  // Postprocess

  // TODO: parse results

  //
  // Return
  return response.data;
};

//
//
// Export
//

module.exports = battleHistoryApi;
