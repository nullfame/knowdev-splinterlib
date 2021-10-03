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
  } = {},
  additionalParameters = {}
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
  const queryParams = {
    before_block: beforeBlock,
    limit,
    types,
    username: player,
    ...additionalParameters,
  };
  log.debug.var({ queryParams });

  //
  // Preprocess
  const request = {
    method: HTTP.METHOD.GET,
    params: queryParams,
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
