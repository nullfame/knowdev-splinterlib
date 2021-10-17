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
// Core Constants
//

const CORE = {
  MODERN_FLOOR: 135,
};

//
//
// Exported Constants
//

// Battle
const BATTLE = {
  FORMAT: {
    ALPHA: "Alpha Edition Only",
    ALPHA_BETA: "Alpha, Beta Allowed",
    GOLD: "Gold Cards Only",
    MODERN: "Modern Format",
    NO_LEGENDARIES: "No Legendaries",
    NO_LEGENDARY_SUMMONERS: "No Legendary Summoners",
    UNTAMED: "Untamed Edition Only",
    UNTAMED_DICE: "Untamed, Dice Allowed",
    WILD: "Wild Format",
  },
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
    ALPHA: "Alpha",
    ALPHA_BETA: "Alpha/Beta",
    BETA: "Beta",
    PROMO: "Promo",
    REWARD: "Reward",
    UNTAMED: "Untamed",
    DICE: "Dice",
    GLADIUS: "Gladius",
    LEVEL: {
      ALPHA: 0,
      BETA: 1,
      PROMO: 2,
      REWARD: 3,
      UNTAMED: 4,
      DICE: 5,
      GLADIUS: 6,
      0: "Alpha",
      "0,1": "Alpha/Beta",
      1: "Beta",
      2: "Promo",
      3: "Reward",
      4: "Untamed",
      5: "Dice",
      6: "Gladius",
    },
  },
  RARITY: {
    COMMON: "Common",
    RARE: "Rare",
    EPIC: "Epic",
    LEGENDARY: "Legendary",
    1: "Common",
    2: "Rare",
    3: "Epic",
    4: "Legendary",
    KEY: {
      1: "COMMON",
      2: "RARE",
      3: "EPIC",
      4: "LEGENDARY",
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

// Ruleset
const RULESET = {
  AIM_TRUE: "Aim True",
  ARMORED_UP: "Armored Up",
  BACK_TO_BASICS: "Back to Basics",
  BROKEN_ARROWS: "Broken Arrows",
  CLOSE_RANGE: "Close Range",
  EARTHQUAKE: "Earthquake",
  EQUAL_OPPORTUNITY: "Equal Opportunity",
  EQUALIZER: "Equalizer",
  EVEN_STEVENS: "Even Stevens",
  EXPLOSIVE_WEAPONRY: "Explosive Weaponry",
  FOG_OF_WAR: "Fog of War",
  HEALED_OUT: "Healed Out",
  HEAVY_HITTERS: "Heavy Hitters",
  HOLY_PROTECTION: "Holy Protection",
  KEEP_YOUR_DISTANCE: "Keep Your Distance",
  LITTLE_LEAGUE: "Little League",
  LOST_LEGENDARIES: "Lost Legendaries",
  LOST_MAGIC: "Lost Magic",
  MELEE_MAYHEM: "Melee Mayhem",
  NOXIOUS_FUMES: "Noxious Fumes",
  ODD_ONES_OUT: "Odd Ones Out",
  REVERSE_SPEED: "Reverse Speed",
  RISE_OF_THE_COMMONS: "Rise of the Commons",
  SILENCED_SUMMONERS: "Silenced Summoners",
  SPREADING_FURY: "Spreading Fury",
  STAMPEDE: "Stampede",
  STANDARD: "Standard",
  SUPER_SNEAK: "Super Sneak",
  TAKING_SIDES: "Taking Sides",
  TARGET_PRACTICE: "Target Practice",
  UNPROTECTED: "Unprotected",
  UP_CLOSE_AND_PERSONAL: "Up Close & Personal",
  WEAK_MAGIC: "Weak Magic",
};

// Splinters
const SPLINTER = {
  DEATH: "Death",
  DRAGON: "Dragon",
  EARTH: "Earth",
  FIRE: "Fire",
  LIFE: "Life",
  WATER: "Water",
  BLACK: "Death",
  BLUE: "Water",
  GOLD: "Dragon",
  GREEN: "Earth",
  RED: "Fire",
  WHITE: "Life",
  Black: "Death",
  Blue: "Water",
  Gold: "Dragon",
  Green: "Earth",
  Red: "Fire",
  White: "Life",
};

//
//
// Export
//

module.exports = {
  BATTLE,
  BATTLE_HISTORY,
  CARD,
  CORE,
  ENDPOINT,
  LEAGUE,
  RULESET,
  SPLINTER,
};
