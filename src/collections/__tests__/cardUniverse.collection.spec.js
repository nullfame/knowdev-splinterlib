const cloneDeep = require("lodash.clonedeep");
const { exerciseIterator } = require("@knowdev/exercise");

const cards = require("../cardUniverse.collection");
const rawCardArray = require("../../../data/cardDetails.json");
const { BATTLE, CARD, SPLINTER } = require("../../util/constants");

//
//
// Mock constants
//

//
//
// Mock modules
//

const mockCardDetailsApi = jest.fn();
jest.mock("../../apis/cardDetails.api", () => () => mockCardDetailsApi());

//
//
// Mock environment
//

const DEFAULT_ENV = process.env;
beforeEach(() => {
  jest.clearAllMocks();
  mockCardDetailsApi.mockReturnValue(cloneDeep(rawCardArray));
  process.env = { ...process.env };
});
afterEach(() => {
  process.env = DEFAULT_ENV;
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
  describe("Refresh function", () => {
    it("Can refresh from live data (cards.refresh())", async () => {
      mockCardDetailsApi.mockReturnValue([{ id: 12, name: "Haunted Goose" }]);
      await cards.refresh();
      expect(mockCardDetailsApi).toBeCalled();
      const card = cards.getTemplate(12);
      expect(card).toBeObject();
      expect(card.name).toBe("Haunted Goose");
    });
    it("Will pull from live data based on env (SPLINTERLIB_FETCH_CARDS=true)", async () => {
      expect(mockCardDetailsApi).not.toBeCalled();
      process.env.SPLINTERLIB_FETCH_CARDS = true;
      // Reset the module cache, re-require the module, and see if we have a different outcome
      jest.resetModules();
      // eslint-disable-next-line global-require
      require("../cardUniverse.collection");
      expect(mockCardDetailsApi).toBeCalled();
    });
    it("Will pull from live data based on env (SPLINTERLIB_FETCH=true)", async () => {
      expect(mockCardDetailsApi).not.toBeCalled();
      process.env.SPLINTERLIB_FETCH = true;
      // Reset the module cache, re-require the module, and see if we have a different outcome
      jest.resetModules();
      // eslint-disable-next-line global-require
      require("../cardUniverse.collection");
      expect(mockCardDetailsApi).toBeCalled();
    });
    it("Won't pull live data if SPLINTERLIB_FETCH_CARDS=false", async () => {
      expect(mockCardDetailsApi).not.toBeCalled();
      process.env.SPLINTERLIB_FETCH = true;
      process.env.SPLINTERLIB_FETCH_CARDS = false;
      // Reset the module cache, re-require the module, and see if we have a different outcome
      jest.resetModules();
      // eslint-disable-next-line global-require
      require("../cardUniverse.collection");
      expect(mockCardDetailsApi).not.toBeCalled();
    });
  });
});
