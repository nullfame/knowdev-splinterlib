const validate = require("@knowdev/arguments");
const cloneDeep = require("lodash.clonedeep");

const { configuration } = require("../core");
const battleHistoryApi = require("../apis/battleHistory.api");

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

const battleHistoryAsyncIterator = async (player, { max = undefined } = {}) => {
  const { log } = configuration;

  //
  //
  // Validate
  //
  validate.string(player);
  log.trace("battleHistoryAsyncIterator parameters validated");

  //
  //
  // Create Iterator
  //
  const asyncIterator = {
    callIndex: undefined,
    callResults: undefined,
    i: 0,
    items: ["one", "two", "three"],
    requestLimit: undefined,
    resultsIndex: 0,
    resultsMax: max,

    async callBattleResultsApi() {
      this.callIndex = 0;
      this.callResults = cloneDeep(await battleHistoryApi(player));
    },

    // asyncIterator Interface, called to pull the next result
    async next() {
      // Do we need to call more results?
      if (!this.callResults) await this.callBattleResultsApi();

      // Have we hit the max number of results to return?
      if (
        this.resultsIndex >= this.resultsMax &&
        this.resultsMax !== undefined
      ) {
        return { done: true };
      }

      // Still here?  Okay, let's build a response
      const response = {};
      // Value is next thing in the results
      response.value = this.callResults[this.callIndex];
      // Increment our indexes
      this.callIndex += 1;
      this.resultsIndex += 1;
      // Assume we are not done
      response.done = false;
      // If there is a maximum number of result, have we hit it?
      if (this.resultsMax !== undefined) {
        response.done = this.resultsIndex > this.resultsMax;
      }
      // Return!
      return response;
    }, // async next()
  };

  //
  //
  // Return
  //
  const wrappedIterator = {
    [Symbol.asyncIterator]() {
      return asyncIterator;
    },
  };
  return wrappedIterator;
}; // battleHistoryAsyncIterator

//
//
// Export
//

module.exports = battleHistoryAsyncIterator;
