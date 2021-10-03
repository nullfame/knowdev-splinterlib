const { Splinterlib } = require("./core");
const battleHistoryApi = require("./apis/battleHistory.api");

//
//
// Append Splinterlib functions
//

Splinterlib.battleHistoryApi = battleHistoryApi;

//
//
// Export
//

module.exports = Splinterlib;
