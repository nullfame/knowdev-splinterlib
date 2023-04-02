const validate = require("@knowdev/arguments");

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
  { player = undefined, status = CORE.LAND_DEEDS.BY_MAP } = {}
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
  const params = {
    region_id: regionId,
    player,
    status,
  };
  log.debug.var({ landDeedsApiParams: params });

  //
  // Preprocess

  //
  // Process

  //
  // Postprocess

  //
  // Return
  return [];
};

//
//
// Export
//

module.exports = landDeeds;
