const battleFilter = require("../battleFilter.function");

const Battle = require("../../models/Battle.model");
const FIXTURE_BATTLE_HISTORY_RESULTS = require("../../__tests__/fixtures/battleHistory.results.json");
const { LEAGUE, RULESET, SPLINTER } = require("../../util/constants");

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

describe("BattleFilter function", () => {
  it("Is a function", () => {
    const filter = battleFilter();
    expect(filter).toBeFunction();
  });
  it("Returns true by default", () => {
    const battle = new Battle(FIXTURE_BATTLE_HISTORY_RESULTS[0]);
    const filter = battleFilter();
    expect(filter(battle)).toBeTrue();
  });
  it("Filters on league (return false)", () => {
    const battle = new Battle(FIXTURE_BATTLE_HISTORY_RESULTS[0]);
    const filter = battleFilter({ league: LEAGUE.BRONZE });
    expect(filter(battle)).toBeFalse();
  });
  it("Filters on league (return true)", () => {
    const battle = new Battle(FIXTURE_BATTLE_HISTORY_RESULTS[0]);
    const filter = battleFilter({ league: LEAGUE.SILVER });
    expect(filter(battle)).toBeTrue();
  });
  it("Filters on mana (return false)", () => {
    const battle = new Battle(FIXTURE_BATTLE_HISTORY_RESULTS[0]);
    // console.log("battle :>> ", battle);
    const filter = battleFilter({ mana: 24 });
    expect(filter(battle)).toBeFalse();
  });
  it("Filters on mana (return true)", () => {
    const battle = new Battle(FIXTURE_BATTLE_HISTORY_RESULTS[0]);
    const filter = battleFilter({ mana: 25 });
    expect(filter(battle)).toBeTrue();
  });
  it("Filters on manaPlusMinus (return false)", () => {
    const battle = new Battle(FIXTURE_BATTLE_HISTORY_RESULTS[0]);
    const filter = battleFilter({ mana: 30, manaPlusMinus: 2 });
    expect(filter(battle)).toBeFalse();
  });
  it("Filters on manaPlusMinus (return true)", () => {
    const battle = new Battle(FIXTURE_BATTLE_HISTORY_RESULTS[0]);
    const filter = battleFilter({ mana: 23, manaPlusMinus: 2 });
    expect(filter(battle)).toBeTrue();
  });
  it("Filters on rulesets (return false)", () => {
    const battle = new Battle(FIXTURE_BATTLE_HISTORY_RESULTS[0]);
    const filter = battleFilter({ rulesets: [RULESET.STANDARD] });
    expect(filter(battle)).toBeFalse();
  });
  it("Filters on rulesets (return true)", () => {
    const battle = new Battle(FIXTURE_BATTLE_HISTORY_RESULTS[0]);
    const filter = battleFilter({ rulesets: [RULESET.TARGET_PRACTICE] });
    expect(filter(battle)).toBeTrue();
  });
  it("Filters on rulesets (or; return true)", () => {
    const battle = new Battle(FIXTURE_BATTLE_HISTORY_RESULTS[0]);
    const filter = battleFilter({
      rulesets: [RULESET.STANDARD, RULESET.TARGET_PRACTICE],
    });
    expect(filter(battle)).toBeTrue();
  });
  it("Filters on rulesets (and; return false)", () => {
    const battle = new Battle(FIXTURE_BATTLE_HISTORY_RESULTS[0]);
    const filter = battleFilter({
      rulesets: [RULESET.STANDARD, RULESET.TARGET_PRACTICE],
      rulesetsAnd: true,
    });
    expect(filter(battle)).toBeFalse();
  });
  it("Filters on splinters (return false)", () => {
    const battle = new Battle(FIXTURE_BATTLE_HISTORY_RESULTS[0]);
    const filter = battleFilter({
      splinters: [SPLINTER.FIRE],
    });
    expect(filter(battle)).toBeFalse();
  });
  it("Filters on splinters (return false)", () => {
    const battle = new Battle(FIXTURE_BATTLE_HISTORY_RESULTS[0]);
    const filter = battleFilter({
      splinters: [SPLINTER.DEATH],
    });
    expect(filter(battle)).toBeFalse();
  });
  it("Filters on splinters (return true)", () => {
    const battle = new Battle(FIXTURE_BATTLE_HISTORY_RESULTS[0]);
    const filter = battleFilter({
      splinters: [SPLINTER.DEATH, SPLINTER.FIRE],
    });
    expect(filter(battle)).toBeTrue();
  });
  it("Filters on loser (return true)", () => {
    const battle = new Battle(FIXTURE_BATTLE_HISTORY_RESULTS[0]);
    battle.loser = "taco";
    const filter = battleFilter({
      loser: "taco",
    });
    expect(filter(battle)).toBeTrue();
  });
  it("Filters on loser (return false)", () => {
    const battle = new Battle(FIXTURE_BATTLE_HISTORY_RESULTS[0]);
    const filter = battleFilter({
      loser: "taco",
    });
    expect(filter(battle)).toBeFalse();
  });
  it("Filters on winner (return true)", () => {
    const battle = new Battle(FIXTURE_BATTLE_HISTORY_RESULTS[0]);
    battle.winner = "taco";
    const filter = battleFilter({
      winner: "taco",
    });
    expect(filter(battle)).toBeTrue();
  });
  it("Filters on winner (return false)", () => {
    const battle = new Battle(FIXTURE_BATTLE_HISTORY_RESULTS[0]);
    const filter = battleFilter({
      winner: "taco",
    });
    expect(filter(battle)).toBeFalse();
  });
  it.todo("Filters on battle formats");
});
