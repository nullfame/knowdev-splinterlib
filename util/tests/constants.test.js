const Splinterlib = require("../../src");

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

describe("Data cache", () => {
  it("Abilities are up to date", async () => {
    const response = await Splinterlib.cardDetailsApi();
    const abilities = new Set();
    response.forEach((card) => {
      const cardAbilities = card.stats.abilities;
      if (cardAbilities) {
        const arr = cardAbilities.flat();
        for (let i = 0; i < arr.length; i += 1) {
          abilities.add(arr[i]);
        }
      }
    });
    expect([...abilities]).toIncludeSameMembers(Splinterlib.ALL.ABILITIES);
  });
  it("Editions are up to date", async () => {
    const response = await Splinterlib.cardDetailsApi();
    const editions = new Set();
    response.forEach((card) => {
      editions.add(card.editions);
    });
    // Expand editions and include "0" (key for the alpha edition, not found in this api)
    expect([...editions, "0"]).toIncludeSameMembers(
      Object.keys(Splinterlib.CARD.EDITION.INDEX)
    );
  });
  it.todo("Rulesets are up to date");
});
