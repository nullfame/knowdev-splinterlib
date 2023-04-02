const validate = require("@knowdev/arguments");
const HTTP = require("@knowdev/http");
const axios = require("axios").default;

const { configuration } = require("../core");
const { CORE } = require("../util/constants");

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

const landDeeds = async (
  regionId,
  { player = undefined, qa = false, status = CORE.LAND_DEEDS.BY_MAP } = {}
) => {
  //
  // Local import
  const { log } = configuration;

  //
  // Validate
  validate.number(regionId);
  validate.string(status);

  // player is required when status is not BY_MAP
  if (status !== CORE.LAND_DEEDS.BY_MAP) {
    validate.string(player);
  } else {
    validate.string(player, { required: false });
  }

  //
  // Setup
  const url = qa ? CORE.ENDPOINT.QA.LAND_DEEDS : CORE.ENDPOINT.LAND_DEEDS;
  const params = {
    region_id: regionId,
    player,
    status,
  };
  log.debug.var({ landDeedsApiParams: params });

  //
  // Preprocess
  const request = {
    method: HTTP.METHOD.GET,
    params,
    url,
  };

  //
  // Process
  const response = await axios(request);

  //
  // Postprocess

  //
  // Return
  return response.data.data;
};

//
//
// Export
//

module.exports = landDeeds;
