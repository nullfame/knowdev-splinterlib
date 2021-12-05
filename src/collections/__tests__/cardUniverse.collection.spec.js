const { exerciseIterator } = require("@knowdev/exercise");

const cards = require("../cardUniverse.collection");
const { ABILITY, BATTLE, CARD, SPLINTER } = require("../../util/constants");

//
//
// Mock environment
//

const DEFAULT_ENV = process.env;
beforeEach(() => {
  process.env = { ...process.env };
});
afterEach(() => {
  process.env = DEFAULT_ENV;
  jest.clearAllMocks();
});

//
//
// Run tests
//

describe("Cards collection", () => {
  it("Works", () => {
    expect(cards).toBeObject();
  });
  describe("All", () => {
    it("Is an array of cards", () => {
      const items = cards.all();
      expect(items).toBeArray();
      const { count } = exerciseIterator(items);
      expect(count).toBePositive();
    });
  });
  describe("All abilities", () => {
    it("Returns all abilities", () => {
      expect(Array.from(cards.abilities())).toIncludeAllMembers(
        Object.values(ABILITY)
      );
    });
  });
  describe("Get function", () => {
    it("Card template can be looked up by id", () => {
      const card = cards.getTemplate(12);
      expect(card).toBeObject();
      expect(card.id).toBe(12);
      expect(card.name).toBe("Pirate Captain");
      expect(card.color).toBe("Blue");
      expect(card.splinter).toBe(SPLINTER.WATER);
      expect(card.type).toBe(CARD.TYPE.MONSTER);
      expect(card.rarityLevel).toBe(1);
      expect(card.rarity).toBe(CARD.RARITY.COMMON);
      expect(card.isStarter).toBe(true);
      expect(card.edition).toBe(CARD.EDITION.ALPHA_BETA);
      expect(card.formats).toBeArray();
      expect(card.formats).toIncludeSameMembers([
        BATTLE.FORMAT.ALPHA,
        BATTLE.FORMAT.ALPHA_BETA,
        BATTLE.FORMAT.NO_LEGENDARIES,
        BATTLE.FORMAT.NO_LEGENDARY_SUMMONERS,
        BATTLE.FORMAT.WILD,
      ]);
    });
  });
});
