//
//
// Constants
//

// Cards
const CARD = {
  EDITION: {
    ALPHA: 0,
    BETA: 1,
    PROMO: 2,
    REWARD: 3,
    UNTAMED: 4,
    DICE: 5,
    GLADIUS: 6,
    0: "ALPHA",
    1: "BETA",
    2: "PROMO",
    3: "REWARD",
    4: "UNTAMED",
    5: "DICE",
    6: "GLADIUS",
  },
  RARITY: {
    COMMON: 1,
    RARE: 2,
    EPIC: 3,
    LEGENDARY: 4,
  },
};

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
  CARD,
  ENDPOINT,
};
