const cloneDeep = require("lodash.clonedeep");

const { Splinterlib } = require("./core");
const CONSTANTS = require("./util/constants");
const battleFilter = require("./functions/battleFilter.function");
const battleHistoryApi = require("./apis/battleHistory.api");
const battleHistoryAsyncIterator = require("./functions/battleHistoryAsyncIterator.function");
const cardDetailsApi = require("./apis/cardDetails.api");
const cardCollectionFilter = require("./functions/cardCollectionFilter.function");
const cardUniverse = require("./collections/cardUniverse.collection");
const landDeeds = require("./apis/landDeeds.api");
const topBattlesApi = require("./apis/topBattles.api");

//
//
// Append Splinterlib functions
//

Splinterlib.battleFilter = battleFilter;
Splinterlib.battleHistoryApi = battleHistoryApi;
Splinterlib.battleHistoryAsyncIterator = battleHistoryAsyncIterator;
Splinterlib.cardDetailsApi = cardDetailsApi;
Splinterlib.cardCollectionFilter = cardCollectionFilter;
Splinterlib.cardUniverse = cardUniverse;
Splinterlib.landDeeds = landDeeds;
Splinterlib.topBattlesApi = topBattlesApi;

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
