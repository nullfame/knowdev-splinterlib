const cloneDeep = require("lodash.clonedeep");

const { Splinterlib } = require("./core");
const CONSTANTS = require("./util/constants");
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
// Append constants
//

Object.keys(CONSTANTS).forEach((KEY) => {
  Splinterlib[KEY] = cloneDeep(CONSTANTS[KEY]);
});
delete Splinterlib.CORE;

//
//
// Export
//

module.exports = Splinterlib;
