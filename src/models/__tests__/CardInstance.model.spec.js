const CardInstance = require("../CardInstance.model");

//
//
// Mock constants
//

const TEST = {
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
  it("Merges template data", () => {
    const card = new CardInstance(TEST.SUMMONER);
    expect(card).toBeObject();
    expect(card.name).toBeString();
  });
});
