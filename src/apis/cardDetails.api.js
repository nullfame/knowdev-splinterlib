const HTTP = require("@knowdev/http");
const axios = require("axios").default;

// const { configuration } = require("../core");
const { CORE } = require("../util/constants");

//
//
// Main
//

const cardDetailsApi = async () => {
  //
  // Local import
  // const { log } = configuration;

  //
  // Preprocess
  const request = {
    method: HTTP.METHOD.GET,
    url: CORE.ENDPOINT.CARD_DETAILS,
  };

  //
  // Process
  const response = await axios(request);

  //
  // Return
  return response.data;
};

//
//
// Export
//

module.exports = cardDetailsApi;
