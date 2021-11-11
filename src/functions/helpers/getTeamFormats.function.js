const cloneDeep = require("lodash.clonedeep");

const { ALL } = require("../../util/constants");
const removeIneligibleCardFormats = require("./removeIneligibleCardFormats.function");

//
//
// Function Definition
//

function getTeamFormats(...teams) {
  const formats = cloneDeep(ALL.BATTLE.FORMATS);
  teams.forEach((team) => {
    removeIneligibleCardFormats(team.summoner, formats);
    team.monsters.forEach((monster) => {
      removeIneligibleCardFormats(monster, formats);
    });
  });
  return formats;
}

//
//
// Export
//

module.exports = getTeamFormats;
