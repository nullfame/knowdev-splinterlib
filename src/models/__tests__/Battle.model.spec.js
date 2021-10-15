const Battle = require("../Battle.model");
const FIXTURE_BATTLE_HISTORY_RESULTS = require("../../__tests__/fixtures/battleHistory.results.json");

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

describe("Battle model", () => {
  it("Works", () => {
    const battle = new Battle();
    expect(battle).toBeObject();
  });
  it("Is a class", () => {
    expect(Battle).toBeClass();
  });
  it("Instantiates battle object", () => {
    const battle = new Battle(FIXTURE_BATTLE_HISTORY_RESULTS[1]);
    // eslint-disable-next-line no-underscore-dangle
    expect(battle._raw).toBeObject();
    expect(battle.createdDate).toBeDate();
    expect(battle.id).toBeString();
    expect(battle.manaCap).toBeNumber();
    expect(battle.winner).toBeString();
    expect(battle.loser).toBeString();
    expect(battle.rulesets).toBeArray();
    expect(battle.type).toBeString();
    expect(battle.players).toBeArray();
    expect(battle.teams).toBeObject();
    // console.log("battle :>> ", battle);
  });
  it.todo("Determines the battle league");
});
