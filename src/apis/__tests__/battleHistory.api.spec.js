const HTTP = require("@knowdev/http");
const log = require("@knowdev/log");

const Splinterlib = require("../..");
const { BATTLE_HISTORY, ENDPOINT } = require("../../util/constants");

Splinterlib.setLogger(log);

//
//
// Mock constants
//

const TEST = {
  LIMIT: 12,
  PLAYER: "testPlayer",
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
  mockAxiosResponseData = [];
});
afterEach(() => {
  process.env = DEFAULT_ENV;
  jest.clearAllMocks();
});

//
//
// Run tests
//

describe("Battle History API", () => {
  it("Works", async () => {
    const response = await Splinterlib.battleHistoryApi(TEST.PLAYER);
    expect(response).toBeArray();
  });
  it("Passes the right default arguments", async () => {
    await Splinterlib.battleHistoryApi(TEST.PLAYER);
    expect(mockAxios).toBeCalled();
    const call = mockAxios.mock.calls[0][0];
    expect(call).toEqual({
      method: HTTP.METHOD.GET,
      params: {
        before_block: BATTLE_HISTORY.BEFORE_BLOCK,
        limit: BATTLE_HISTORY.LIMIT,
        types: BATTLE_HISTORY.TYPES,
        username: TEST.PLAYER,
      },
      url: ENDPOINT.LEGACY.BATTLE_HISTORY,
    });
  });
  it.todo("Allows overriding known parameters");
  it.todo("Allows overriding additional parameters");
  it.todo("Returns raw results");
  it.todo("Returns parsed results");
});
