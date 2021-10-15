//
//
// Local Constants
//

// Hosts
const HOST = {
  LEGACY_API: "https://api.steemmonsters.io",
  MODERN_API: "https://api2.splinterlands.com",
};

//
//
// Exported Constants
//

// Battle
const BATTLE = {
  TYPE: {
    TOURNAMENT: "Tournament",
    BRAWL: "Brawl",
    Ranked: "Ranked",
  },
};

// Battle History
const BATTLE_HISTORY = {
  BEFORE_BLOCK: -1,
  LIMIT: 50,
  TYPES: "sm_battle,battle",
};

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
  },
  RARITY: {
    COMMON: 1,
    RARE: 2,
    EPIC: 3,
    LEGENDARY: 4,
  },
};

// Endpoints
const ENDPOINT = {
  LEGACY: {
    BATTLE_HISTORY: `${HOST.LEGACY_API}/players/history`,
  },
};

//
//
// Maps
//

const MAP = {
  COLOR: {
    Black: "Death",
    Blue: "Water",
    Gold: "Dragon",
    Green: "Earth",
    Red: "Fire",
    White: "Life",
  },
  EDITION: {
    0: "Alpha",
    "0,1": "Alpha/Beta",
    1: "Beta",
    2: "Promo",
    3: "Reward",
    4: "Untamed",
    5: "Dice",
    6: "Gladius",
  },
  RARITY_LEVEL: {
    1: "Common",
    2: "Rare",
    3: "Epic",
    4: "Legendary",
  },
};

//
//
// Export
//

module.exports = {
  BATTLE,
  BATTLE_HISTORY,
  CARD,
  ENDPOINT,
  MAP,
};
