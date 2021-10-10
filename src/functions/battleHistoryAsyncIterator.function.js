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
    beforeBlock: undefined,
    callIndex: undefined,
    callResults: undefined,
    lastBeforeBlock: undefined,
    requestLimit: undefined,
    resultsIndex: 0,
    resultsMax: max,

    async callBattleResultsApi() {
      // Reset call index
      this.callIndex = 0;
      // Reset before block
      this.lastBeforeBlock = this.beforeBlock;
      this.beforeBlock = undefined;
      if (this.callResults && this.callResults.length > 0) {
        this.beforeBlock =
          this.callResults[this.callResults.length - 1].block_num - 1;
      }
      // If beforeBlock is not lower than before, we are probably in an infinite loop
      if (
        this.lastBeforeBlock !== undefined &&
        this.lastBeforeBlock <= this.beforeBlock
      ) {
        this.callResults = [];
        return;
      }
      // Get new results
      this.callResults = cloneDeep(
        await battleHistoryApi(player, { beforeBlock: this.beforeBlock })
      );
    },

    // asyncIterator Interface, called to pull the next result
    async next() {
      // Have we hit the max number of results to return?
      if (
        this.resultsIndex >= this.resultsMax &&
        this.resultsMax !== undefined
      ) {
        return { done: true };
      }

      // Do we need to call more results?
      if (!this.callResults || this.callIndex >= this.callResults.length) {
        await this.callBattleResultsApi();
      }

      // Are we out of results?
      if (!this.callResults || this.callResults.length === 0) {
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
