const rawSiteSettingsObject = require("../../data/siteSettings.json");

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

class Settings {
  //
  //
  // Constructor
  //
  constructor() {
    Object.keys(rawSiteSettingsObject).forEach((key) => {
      this[key] = rawSiteSettingsObject[key];
    });
  }

  //
  //
  // Functions
  //

  //
}

//
//
// Export
//

module.exports = new Settings();
