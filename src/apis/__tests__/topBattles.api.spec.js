const HTTP = require("@knowdev/http");
const log = require("@knowdev/log");
const cloneDeep = require("lodash.clonedeep");

const Splinterlib = require("../..");
const { CORE, LEAGUE } = require("../../util/constants");
const FIXTURE_TOP_BATTLES_RESULTS = require("../../__tests__/fixtures/topBattles.results.json");

Splinterlib.setLogger(log);

//
//
// Mock constants
//

const TEST = {
  LIMIT: 12,
};

//
//
// Mock modules
//

const mockAxios = jest.fn();
let mockAxiosResponseData;
jest.mock("axios", () => ({
  default: (request) => {
    mockAxios(request);
    return { data: mockAxiosResponseData };
  },
}));

//
//
// Mock environment
//

const DEFAULT_ENV = process.env;
beforeEach(() => {
  process.env = { ...process.env };
  mockAxiosResponseData = cloneDeep(FIXTURE_TOP_BATTLES_RESULTS);
});
afterEach(() => {
  process.env = DEFAULT_ENV;
  jest.clearAllMocks();
});

//
//
// Run tests
//

describe("Top Battles API", () => {
  it("Works", async () => {
    const response = await Splinterlib.topBattlesApi();
    expect(response).toBeObject();
    expect(response.battles).toBeArray();
    expect(response.player).toBeString();
  });
  it("Passes the right default arguments", async () => {
    await Splinterlib.topBattlesApi();
    expect(mockAxios).toBeCalled();
    const call = mockAxios.mock.calls[0][0];
    expect(call).toEqual({
      method: HTTP.METHOD.GET,
      params: {
        leaderboard: LEAGUE.LEADERBOARD.CHAMPION,
        limit: CORE.BATTLE_HISTORY.LIMIT,
        player: CORE.TOP_BATTLES_PLAYER,
      },
      url: CORE.ENDPOINT.TOP_BATTLES,
    });
  });
  it("Allows overriding known parameters", async () => {
    await Splinterlib.topBattlesApi({
      limit: TEST.LIMIT,
    });
    expect(mockAxios).toBeCalled();
    const call = mockAxios.mock.calls[0][0];
    expect(call).toEqual({
      method: HTTP.METHOD.GET,
      params: {
        leaderboard: LEAGUE.LEADERBOARD.CHAMPION,
        limit: TEST.LIMIT,
        player: CORE.TOP_BATTLES_PLAYER,
      },
      url: CORE.ENDPOINT.TOP_BATTLES,
    });
  });
  it("Allows overriding additional parameters", async () => {
    await Splinterlib.topBattlesApi({
      queryParams: {
        limit: TEST.LIMIT,
        hello: "world",
      },
    });
    expect(mockAxios).toBeCalled();
    const call = mockAxios.mock.calls[0][0];
    expect(call).toEqual({
      method: HTTP.METHOD.GET,
      params: {
        hello: "world",
        leaderboard: LEAGUE.LEADERBOARD.CHAMPION,
        limit: TEST.LIMIT,
        player: CORE.TOP_BATTLES_PLAYER,
      },
      url: CORE.ENDPOINT.TOP_BATTLES,
    });
  });
  it("Returns parsed results by default", async () => {
    const response = await Splinterlib.topBattlesApi();
    response.battles.forEach((battle) => {
      expect(battle.created_date).toBeDate();
      expect(battle.settings).toBeObject();
      expect(battle.dec_info).toBeObject();
      expect(battle.player_1_data.join_date).toBeDate();
      expect(battle.player_1_data.guild_data).toBeObject();
      expect(battle.player_2_data.join_date).toBeDate();
      expect(battle.player_2_data.guild_data).toBeObject();
    });
    expect(response.battles).toBeArray();
  });
  it("Returns raw results when passed", async () => {
    const response = await Splinterlib.topBattlesApi({
      raw: true,
    });
    response.battles.forEach((battle) => {
      expect(battle.created_date).toBeString();
      expect(battle.settings).toBeString();
      expect(battle.dec_info).toBeString();
      expect(battle.player_1_data.join_date).toBeString();
      expect(battle.player_1_data.guild_data).toBeString();
      expect(battle.player_2_data.join_date).toBeString();
      expect(battle.player_2_data.guild_data).toBeString();
    });
    expect(response.battles).toBeArray();
  });
});
