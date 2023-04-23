const compareArrays = require("../functions/compareArrays.function");

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
    expect(compareArrays([...abilities], Splinterlib.ALL.ABILITIES)).toBeTrue();
  });
  it.todo("Editions are up to date");
  it.todo("Rulesets are up to date");
});
