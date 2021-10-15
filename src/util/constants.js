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
    BRAWL: "Brawl",
    Ranked: "Ranked",
    SURRENDER: "Surrender",
    TOURNAMENT: "Tournament",
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
    KEY: {
      Common: "COMMON",
      Rare: "RARE",
      Epic: "EPIC",
      Legendary: "LEGENDARY",
    },
  },
  TYPE: {
    MONSTER: "Monster",
    SUMMONER: "Summoner",
  },
};

// Endpoints
const ENDPOINT = {
  LEGACY: {
    BATTLE_HISTORY: `${HOST.LEGACY_API}/players/history`,
  },
};

// League
const LEAGUE = {
  // Keys
  NOVICE: "Novice",
  BRONZE: "Bronze",
  SILVER: "Silver",
  GOLD: "Gold",
  DIAMOND: "Diamond",
  CHAMPION: "Champion",
  // Maps
  SUMMONER_CAPS: {
    NOVICE: {
      COMMON: 1,
      RARE: 1,
      EPIC: 1,
      LEGENDARY: 1,
    },
    BRONZE: {
      COMMON: 3,
      RARE: 2,
      EPIC: 2,
      LEGENDARY: 1,
    },
    SILVER: {
      COMMON: 5,
      RARE: 4,
      EPIC: 3,
      LEGENDARY: 2,
    },
    GOLD: {
      COMMON: 8,
      RARE: 6,
      EPIC: 5,
      LEGENDARY: 3,
    },
    DIAMOND: {
      COMMON: 10,
      RARE: 8,
      EPIC: 6,
      LEGENDARY: 4,
    },
    CHAMPION: {
      COMMON: 10,
      RARE: 8,
      EPIC: 6,
      LEGENDARY: 4,
    },
    COMMON: {
      NOVICE: 1,
      BRONZE: 3,
      SILVER: 5,
      GOLD: 8,
      DIAMOND: 10,
      CHAMPION: 10,
    },
    RARE: {
      NOVICE: 1,
      BRONZE: 2,
      SILVER: 4,
      GOLD: 6,
      DIAMOND: 8,
      CHAMPION: 8,
    },
    EPIC: {
      NOVICE: 1,
      BRONZE: 2,
      SILVER: 3,
      GOLD: 5,
      DIAMOND: 6,
      CHAMPION: 6,
    },
    LEGENDARY: {
      NOVICE: 1,
      BRONZE: 1,
      SILVER: 2,
      GOLD: 3,
      DIAMOND: 4,
      CHAMPION: 4,
    },
  },
  KEY: {
    Novice: "NOVICE",
    Bronze: "BRONZE",
    Silver: "SILVER",
    Gold: "GOLD",
    Diamond: "DIAMOND",
    Champion: "CHAMPION",
  },
  LEVEL: {
    0: "Novice",
    1: "Bronze",
    2: "Silver",
    3: "Gold",
    4: "Diamond",
    5: "Champion",
    NOVICE: 0,
    BRONZE: 1,
    SILVER: 2,
    GOLD: 3,
    DIAMOND: 4,
    CHAMPION: 5,
    Novice: 0,
    Bronze: 1,
    Silver: 2,
    Gold: 3,
    Diamond: 4,
    Champion: 5,
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
  LEAGUE,
  MAP,
};
