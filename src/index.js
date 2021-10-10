const { Splinterlib } = require("./core");
const battleHistoryApi = require("./apis/battleHistory.api");
const battleHistoryAsyncIterator = require("./functions/battleHistoryAsyncIterator.function");

//
//
// Append Splinterlib functions
//

Splinterlib.battleHistoryApi = battleHistoryApi;
Splinterlib.battleHistoryAsyncIterator = battleHistoryAsyncIterator;

//
//
// Export
//

module.exports = Splinterlib;
