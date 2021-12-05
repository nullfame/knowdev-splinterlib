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
  BATTLE_HISTORY: {
    BEFORE_BLOCK: -1,
    LIMIT: 50,
    TYPES: "sm_battle,battle",
  },
  ENDPOINT: {
    CARD_DETAILS: `${HOST.LEGACY_API}/cards/get_details`,
    LEGACY: {
      BATTLE_HISTORY: `${HOST.LEGACY_API}/players/history`,
    },
  },
  KEY: {
    SPLINTERLIB_FETCH: "SPLINTERLIB_FETCH",
    SPLINTERLIB_FETCH_CARDS: "SPLINTERLIB_FETCH_CARDS",
  },
  MODERN_FLOOR: 135,
};

//
//
// Exported Constants
//

// Ability
const ABILITY = {
  AFFLICTION: "Affliction",
  AMPLIFY: "Amplify",
  BACKFIRE: "Backfire",
  BLAST: "Blast",
  BLIND: "Blind",
  BLOODLUST: "Bloodlust",
  CAMOUFLAGE: "Camouflage",
  CLEANSE: "Cleanse",
  CLOSE_RANGE: "Close Range",
  CRIPPLE: "Cripple",
  DEATHBLOW: "Deathblow",
  DEMORALIZE: "Demoralize",
  DISPEL: "Dispel",
  DIVINE_SHIELD: "Divine Shield",
  DODGE: "Dodge",
  DOUBLE_STRIKE: "Double Strike",
  ENRAGE: "Enrage",
  FLYING: "Flying",
  FORCEFIELD: "Forcefield",
  HALVING: "Halving",
  HEADWINDS: "Headwinds",
  HEAL: "Heal",
  IMMUNITY: "Immunity",
  INSPIRE: "Inspire",
  KNOCK_OUT: "Knock Out",
  LAST_STAND: "Last Stand",
  LIFE_LEECH: "Life Leech",
  MAGIC_REFLECT: "Magic Reflect",
  OPPORTUNITY: "Opportunity",
  OPPRESS: "Oppress",
  PHASE: "Phase",
  PIERCING: "Piercing",
  POISON: "Poison",
  PROTECT: "Protect",
  REACH: "Reach",
  REDEMPTION: "Redemption",
  REPAIR: "Repair",
  RESURRECT: "Resurrect",
  RETALIATE: "Retaliate",
  RETURN_FIRE: "Return Fire",
  RUST: "Rust",
  SCAVENGER: "Scavenger",
  SHATTER: "Shatter",
  SHIELD: "Shield",
  SILENCE: "Silence",
  SLOW: "Slow",
  SNARE: "Snare",
  SNEAK: "Sneak",
  SNIPE: "Snipe",
  STRENGTHEN: "Strengthen",
  STUN: "Stun",
  SWIFTNESS: "Swiftness",
  TANK_HEAL: "Tank Heal",
  TAUNT: "Taunt",
  THORNS: "Thorns",
  TRAMPLE: "Trample",
  TRIAGE: "Triage",
  TRUE_STRIKE: "True Strike",
  VOID_ARMOR: "Void Armor",
  VOID: "Void",
  WEAKEN: "Weaken",
};

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
    RANKED: "Ranked",
    SURRENDER: "Surrender",
    TOURNAMENT: "Tournament",
  },
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
    INDEX: {
      0: "Alpha",
      "0,1": "Alpha/Beta",
      1: "Beta",
      2: "Promo",
      3: "Reward",
      4: "Untamed",
      5: "Dice",
      6: "Gladius",
    },
    KEY: {
      ALPHA: 0,
      BETA: 1,
      PROMO: 2,
      REWARD: 3,
      UNTAMED: 4,
      DICE: 5,
      GLADIUS: 6,
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
  STAT: {
    MANA: "mana",
    ATTACK: "attack",
    RANGED: "ranged",
    MAGIC: "magic",
    ARMOR: "armor",
    HEALTH: "health",
    SPEED: "speed",
  },
  TYPE: {
    MONSTER: "Monster",
    SUMMONER: "Summoner",
  },
};

// Filters
const FILTER = {
  EQUALS: "=",
  IS: "=",
  LESS_THAN: "<",
  LESS_THAN_OR_EQUAL: "<=",
  GREATER_THAN: ">",
  GREATER_THAN_OR_EQUAL: ">=",
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
  NEUTRAL: "Neutral",
  WATER: "Water",
  BLACK: "Death",
  BLUE: "Water",
  GOLD: "Dragon",
  GRAY: "Neutral",
  GREEN: "Earth",
  RED: "Fire",
  WHITE: "Life",
  Black: "Death",
  Blue: "Water",
  Gold: "Dragon",
  Gray: "Neutral",
  Green: "Earth",
  Red: "Fire",
  White: "Life",
};

//
//
// Derived Constants
//

const ALL = {
  BATTLE: {},
  CARD: {},
};
ALL.ABILITIES = Object.values(ABILITY);
ALL.BATTLE.FORMATS = Object.values(BATTLE.FORMAT);
ALL.CARD.EDITIONS = Object.values(CARD.EDITION).filter(
  (card) => typeof card === "string"
);
// Filter out anything that isn't a string from the values, convert that to a Set for unique items only, convert that back to Array
ALL.CARD.RARITIES = Array.from(
  new Set(Object.values(CARD.RARITY).filter((card) => typeof card === "string"))
);
ALL.CARD.TYPES = Object.values(CARD.TYPE);
// Filter out anything that isn't a string from the values, convert that to a Set for unique items only, convert that back to Array
ALL.SPLINTERS = Array.from(
  new Set(Object.values(SPLINTER).filter((card) => typeof card === "string"))
);

//
//
// Export
//

module.exports = {
  ABILITY,
  ALL,
  BATTLE,
  CARD,
  CORE,
  FILTER,
  LEAGUE,
  RULESET,
  SPLINTER,
};
