const cloneDeep = require("lodash.clonedeep");
const intersection = require("lodash.intersection");

const { ALL } = require("../../util/constants");

//
//
// Function Definition
//

function intersectTeamFormats(...teams) {
  let formats = cloneDeep(ALL.BATTLE.FORMATS);
  teams.forEach((team) => {
    formats = intersection(formats, team.summoner.formats);
    team.monsters.forEach((monster) => {
      formats = intersection(formats, monster.formats);
    });
  });
  return formats;
}

//
//
// Export
//

module.exports = intersectTeamFormats;
