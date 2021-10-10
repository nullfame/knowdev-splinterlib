/* eslint-disable no-restricted-syntax */
const cloneDeep = require("lodash.clonedeep");

const battleHistoryAsyncIterator = require("../battleHistoryAsyncIterator.function");
const battleHistoryResults = require("../../apis/__tests__/fixtures/battleHistory.results.json");

//
//
// Mock constants
//

const MOCK = {
  PLAYER: "mockPlayer",
};

//
//
// Mock modules
//

const mockBattleHistoryApi = jest.fn();
let mockBattleHistoryApiResponse;
jest.mock(
  "../../apis/battleHistory.api",
  () =>
    (...params) =>
      mockBattleHistoryApi(...params)
);

beforeEach(() => {
  mockBattleHistoryApiResponse = cloneDeep(battleHistoryResults);
  mockBattleHistoryApi.mockReturnValue(mockBattleHistoryApiResponse);
});
afterEach(() => {
  jest.clearAllMocks();
});

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

describe("BattleHistoryAsyncIterator function", () => {
  it("Works", async () => {
    const response = await battleHistoryAsyncIterator(MOCK.PLAYER);
    expect(response).not.toBeUndefined();
  });
  it("Is an async iterator", async () => {
    const response = await battleHistoryAsyncIterator(MOCK.PLAYER);
    // TODO: move to @knowdev/jest
    expect(response[Symbol.asyncIterator]).toBeFunction();
  });
  it("Calls the battleHistoryApi", async () => {
    const response = await battleHistoryAsyncIterator(MOCK.PLAYER);
    response[Symbol.asyncIterator]().next();
    expect(mockBattleHistoryApi).toBeCalledTimes(1);
  });
  it("Has results we can iterate through", async () => {
    const response = await battleHistoryAsyncIterator(MOCK.PLAYER);
    const result = await response[Symbol.asyncIterator]().next();
    expect(result.value).toBeObject();
    expect(result.done).toBeBoolean();
  });
  it("Allows max responses to be specified", async () => {
    const response = await battleHistoryAsyncIterator(MOCK.PLAYER, { max: 4 });
    let count = 0;
    for await (const result of response) {
      expect(result).toBeObject();
      count += 1;
    }
    expect(count).toBe(4);
  });
  it.todo("Continues until there are no results if no max is specified");
  it.todo("Allows a request limit to be specified");
  it.todo("Allows a constructor to be passed for results");
  it.todo("Allows a filter to be passed");
});
