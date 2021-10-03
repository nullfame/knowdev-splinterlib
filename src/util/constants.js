//
//
// Constants
//

// Hosts
const HOST = {
  LEGACY_API: "https://api.steemmonsters.io",
  MODERN_API: "https://api2.splinterlands.com",
};

// Endpoints
const ENDPOINT = {
  LEGACY: {
    BATTLE_HISTORY: `${HOST.LEGACY_API}/players/history`,
  },
};

// Battle History
const BATTLE_HISTORY = {
  BEFORE_BLOCK: -1,
  LIMIT: 50,
  TYPES: "sm_battle,battle",
};

//
//
// Export
//

module.exports = {
  BATTLE_HISTORY,
  ENDPOINT,
};
