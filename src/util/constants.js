//
//
// Constants
//

// Hosts
const LEGACY_API_HOST = "api.steemmonsters.io";
const MODERN_API_HOST = "api2.splinterlands.com";

// Endpoints
const ENDPOINT = {
  LEGACY_BATTLE_HISTORY: "/players/history",
};

// Battle History
const BATTLE_HISTORY_LIMIT = 50;

//
//
// Export
//

module.exports = {
  BATTLE_HISTORY_LIMIT,
  ENDPOINT,
  LEGACY_API_HOST,
  MODERN_API_HOST,
};
