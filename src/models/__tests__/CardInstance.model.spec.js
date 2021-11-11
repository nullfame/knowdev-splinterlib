const CardInstance = require("../CardInstance.model");
const { BATTLE, CARD, LEAGUE } = require("../../util/constants");

//
//
// Mock constants
//

const TEST = {
  BETA_MONSTER: {
    uid: "C1-1-97ZL2ZO9DC",
    xp: 765,
    gold: false,
    card_detail_id: 1,
    level: 6,
    edition: 1,
  },
  SUMMONER: {
    uid: "C5-259-006S6VV700",
    xp: 115,
    gold: false,
    card_detail_id: 259,
    level: 4,
    edition: 5,
  },
};

//
//
// Mock modules
//

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
});

//
//
// Run tests
//

describe("CardInstance model", () => {
  it("Works", () => {
    const card = new CardInstance();
    expect(card).toBeObject();
  });
  it("Is a class", () => {
    expect(CardInstance).toBeClass();
  });
  it("Instantiates card instance", () => {
    const card = new CardInstance(TEST.SUMMONER);
    expect(card).toBeObject();
    expect(card.id).toBeNumber();
    expect(card.id).toBe(TEST.SUMMONER.card_detail_id);
    expect(card.template).toBeObject();
  });
  it("Beta card returns correct edition", () => {
    const card = new CardInstance(TEST.BETA_MONSTER);
    expect(card).toBeObject();
    expect(card.edition).toBe(CARD.EDITION.BETA);
  });
  it("Beta card returns correct formats", () => {
    const card = new CardInstance(TEST.BETA_MONSTER);
    expect(card).toBeObject();
    expect(card.formats).toBeArray();
    expect(card.formats).toContain(BATTLE.FORMAT.ALPHA_BETA);
    expect(card.formats).not.toContain(BATTLE.FORMAT.ALPHA);
  });
  it("Merges template data", () => {
    const card = new CardInstance(TEST.SUMMONER);
    expect(card).toBeObject();
    expect(card.name).toBeString();
  });
  describe("Determine card instance leagues", () => {
    it("Determines card instance league", () => {
      const card = new CardInstance(TEST.SUMMONER);
      expect(card.league).toBe(LEAGUE.SILVER);
    });
  });
});
