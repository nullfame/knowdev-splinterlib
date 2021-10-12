const cards = require("../cardUniverse.collection");

//
//
// Mock constants
//

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

describe("Cards collection", () => {
  it("Works", () => {
    expect(cards).toBeObject();
  });
  it("Card template can be looked up by id", () => {
    const card = cards.get(12);
    expect(card).toBeObject();
    expect(card.name).toBe("Pirate Captain");
  });
  it.todo("Can refresh from live data (cards.refresh())");
  it.todo(
    "Will pull from live data based on env (SPLINTERLIB_FETCH_CARDS=true)"
  );
});
