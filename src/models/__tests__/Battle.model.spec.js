const cloneDeep = require("lodash.clonedeep");

const Battle = require("../Battle.model");
const FIXTURE_BATTLE_HISTORY_RESULTS = require("../../__tests__/fixtures/battleHistory.results.json");
const { LEAGUE } = require("../../util/constants");

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
  });
  it("Determines the battle league", () => {
    const results = cloneDeep(FIXTURE_BATTLE_HISTORY_RESULTS[0]);
    results.result = JSON.parse(results.result);
    results.result.details.team2.summoner.level = 4;
    const battle = new Battle(results);
    expect(battle.league).toBe(LEAGUE.DIAMOND);
  });
  it("Instantiates both teams", () => {
    const battle = new Battle(FIXTURE_BATTLE_HISTORY_RESULTS[1]);
    const player1 = battle.players[0];
    const player2 = battle.players[1];
    expect(battle.teams[player1]).toBeObject();
    expect(battle.teams[player1].rating).toBeNumber();
    expect(battle.teams[player1].color).toBeString();
    expect(battle.teams[player1].splinter).toBeString();
    expect(battle.teams[player1].summoner).toBeObject();
    expect(battle.teams[player1].monsters).toBeArray();
    expect(battle.teams[player1].monsters[0]).toBeObject();
    expect(battle.teams[player2]).toBeObject();
    expect(battle.teams[player2].rating).toBeNumber();
    expect(battle.teams[player2].color).toBeString();
    expect(battle.teams[player2].splinter).toBeString();
    expect(battle.teams[player2].summoner).toBeObject();
    expect(battle.teams[player2].monsters).toBeArray();
    expect(battle.teams[player2].monsters[0]).toBeObject();
  });
});
