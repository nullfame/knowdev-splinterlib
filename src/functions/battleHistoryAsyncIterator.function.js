const validate = require("@knowdev/arguments");
const cloneDeep = require("lodash.clonedeep");

const { configuration } = require("../core");
const battleHistoryApi = require("../apis/battleHistory.api");
const Battle = require("../models/Battle.model");

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

const battleHistoryAsyncIterator = async (
  player,
  {
    beforeBlock = undefined,
    filter = undefined,
    limit = undefined,
    max = undefined,
    raw = false,
    resultsClass = Battle,
  } = {}
) => {
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
  /* eslint-disable no-underscore-dangle */
  const asyncIterator = {
    _beforeBlock: undefined,
    _beforeBlockParam: beforeBlock,
    _callIndex: undefined,
    _callLimit: limit,
    _callResults: undefined,
    _lastBeforeBlock: undefined,
    _raw: raw,
    _requestLimit: undefined,
    _resultsClass: resultsClass,
    _resultsFilter: filter,
    _resultsIndex: 0,
    _resultsMax: max,

    async _callBattleResultsApi() {
      // Reset call index
      this._callIndex = 0;
      // Reset before block
      this._lastBeforeBlock = this._beforeBlock;
      this._beforeBlock = undefined;
      if (this._callResults && this._callResults.length > 0) {
        this._beforeBlock =
          this._callResults[this._callResults.length - 1].block_num - 1;
      }
      // If beforeBlock is not lower than before, we are probably in an infinite loop
      if (
        this._lastBeforeBlock !== undefined &&
        this._lastBeforeBlock <= this._beforeBlock
      ) {
        this._callResults = [];
        return;
      }
      // If this is the very first call, use beforeBlockParam
      if (
        this._beforeBlock === undefined &&
        this._lastBeforeBlock === undefined
      ) {
        this._beforeBlock = this._beforeBlockParam;
      }
      // Get new results
      this._callResults = cloneDeep(
        await battleHistoryApi(player, {
          beforeBlock: this._beforeBlock,
          limit: this._callLimit,
        })
      );
    },

    async _next() {
      // Have we hit the max number of results to return?
      if (
        this._resultsIndex >= this._resultsMax &&
        this._resultsMax !== undefined
      ) {
        return { done: true };
      }

      // Do we need to call more results?
      if (!this._callResults || this._callIndex >= this._callResults.length) {
        await this._callBattleResultsApi();
      }

      // Are we out of results?
      if (!this._callResults || this._callResults.length === 0) {
        return { done: true };
      }

      // Still here?  Okay, let's build a response
      const response = {};
      // Value is next thing in the results
      response.value = this._callResults[this._callIndex];
      // Are we using a class wrapper?
      if (!this._raw) {
        // eslint-disable-next-line new-cap
        response.value = new this._resultsClass(response.value);
      }
      // Increment our index
      this._callIndex += 1;
      // Assume we are not done
      response.done = false;
      // If there is a maximum number of result, have we hit it?
      if (this._resultsMax !== undefined) {
        response.done = this._resultsIndex > this._resultsMax;
      }
      // Return!
      return response;
    }, // async _next()

    async next() {
      // If we're not using a filter, return
      if (this._resultsFilter === undefined) {
        const response = await this._next();
        this._resultsIndex += 1;
        return response;
      }

      // If we're using a filter, iterate until we have a result
      let result = await this._next();
      while (result.done === false) {
        if (this._resultsFilter(result.value)) {
          this._resultsIndex += 1;
          return result;
        }
        // eslint-disable-next-line no-await-in-loop
        result = await this._next();
      }
      this._resultsIndex += 1;
      return result;
    },
  };
  /* eslint-enable no-underscore-dangle */

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
