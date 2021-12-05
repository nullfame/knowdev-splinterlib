const HTTP = require("@knowdev/http");
const axios = require("axios").default;

// const { configuration } = require("../core");
const { CORE } = require("../util/constants");

//
//
// Main
//

const cardDetailsApi = async ({ qa = false } = {}) => {
  //
  // Local import
  // const { log } = configuration;

  //
  // Setup
  const url = qa ? CORE.ENDPOINT.QA.CARD_DETAILS : CORE.ENDPOINT.CARD_DETAILS;

  //
  // Preprocess
  const request = {
    method: HTTP.METHOD.GET,
    url,
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
