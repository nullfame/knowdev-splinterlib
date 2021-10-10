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
// Helpers
//

// TODO: make @knowdev/exercise
async function exerciseAsyncIterator(iterator) {
  let count = 0;
  // eslint-disable-next-line no-unused-vars
  for await (const result of iterator) {
    count += 1;
  }
  return { count };
}

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
    const { count } = await exerciseAsyncIterator(response);
    expect(count).toBe(4);
  });
  it("Calls API multiple times to get results (1 over length)", async () => {
    const callCount = 2;
    const resultMax = mockBattleHistoryApiResponse.length * (callCount - 1) + 1;
    const response = await battleHistoryAsyncIterator(MOCK.PLAYER, {
      max: resultMax,
    });
    const { count } = await exerciseAsyncIterator(response);
    expect(mockBattleHistoryApi).toBeCalledTimes(callCount);
    expect(count).toBe(resultMax);
  });
  it("Calls API multiple times to get results (exact length)", async () => {
    const callCount = 3;
    const resultMax = mockBattleHistoryApiResponse.length * callCount;

    // Subsequent responses must be different to not trigger infinite loop prevention
    const secondResponse = cloneDeep(mockBattleHistoryApiResponse);
    secondResponse[secondResponse.length - 1].block_num -= 1234;
    const thirdResponse = cloneDeep(secondResponse);
    thirdResponse[thirdResponse.length - 1].block_num -= 1234;

    // Only return results twice
    mockBattleHistoryApi
      .mockReturnValueOnce(mockBattleHistoryApiResponse)
      .mockReturnValueOnce(secondResponse)
      .mockReturnValueOnce(thirdResponse);

    const response = await battleHistoryAsyncIterator(MOCK.PLAYER, {
      max: resultMax,
    });
    const { count } = await exerciseAsyncIterator(response);
    expect(mockBattleHistoryApi).toBeCalledTimes(callCount);
    expect(count).toBe(resultMax);
  });
  it("Stops when there are no results if reached before max", async () => {
    const callsWithData = 2;
    const actualResults = mockBattleHistoryApiResponse.length * callsWithData;
    const resultMax = actualResults * 2;

    // Second response must be different to not trigger infinite loop prevention
    const secondResponse = cloneDeep(mockBattleHistoryApiResponse);
    secondResponse[secondResponse.length - 1].block_num -= 1234;

    // Only return results twice
    mockBattleHistoryApi
      .mockReturnValue([])
      .mockReturnValueOnce(mockBattleHistoryApiResponse)
      .mockReturnValueOnce(secondResponse);

    const response = await battleHistoryAsyncIterator(MOCK.PLAYER, {
      max: resultMax,
    });
    const { count } = await exerciseAsyncIterator(response);
    expect(mockBattleHistoryApi).toBeCalledTimes(callsWithData + 1);
    expect(count).toBe(actualResults);
  });
  it("Continues until there are no results if no max is specified", async () => {
    const callsWithData = 2;
    const actualResults = mockBattleHistoryApiResponse.length * callsWithData;

    // Second response must be different to not trigger infinite loop prevention
    const secondResponse = cloneDeep(mockBattleHistoryApiResponse);
    secondResponse[secondResponse.length - 1].block_num -= 1234;

    // Only return results twice
    mockBattleHistoryApi
      .mockReturnValue([])
      .mockReturnValueOnce(mockBattleHistoryApiResponse)
      .mockReturnValueOnce(secondResponse);

    const response = await battleHistoryAsyncIterator(MOCK.PLAYER);
    const { count } = await exerciseAsyncIterator(response);
    expect(mockBattleHistoryApi).toBeCalledTimes(callsWithData + 1);
    expect(count).toBe(actualResults);
  });
  it("Decrements last block as calls increase", async () => {
    const callCount = 2;
    const resultMax = mockBattleHistoryApiResponse.length * callCount;
    const response = await battleHistoryAsyncIterator(MOCK.PLAYER, {
      max: resultMax,
    });
    await exerciseAsyncIterator(response);
    expect(mockBattleHistoryApi).toBeCalledTimes(callCount);
    expect(mockBattleHistoryApi.mock.calls).toBeArrayOfSize(2);
    expect(mockBattleHistoryApi.mock.calls[0]).toIncludeSameMembers([
      MOCK.PLAYER,
      { beforeBlock: undefined },
    ]);
    expect(mockBattleHistoryApi.mock.calls[1]).toIncludeSameMembers([
      MOCK.PLAYER,
      {
        beforeBlock:
          mockBattleHistoryApiResponse[mockBattleHistoryApiResponse.length - 1]
            .block_num - 1,
      },
    ]);
  });
  it("Makes sure last block is lower than previous call (prevents infinite loops)", async () => {
    // This test works because the mock returns the same results over and over again
    const callCount = 3;
    const resultMax = mockBattleHistoryApiResponse.length * callCount;
    const response = await battleHistoryAsyncIterator(MOCK.PLAYER, {
      max: resultMax,
    });
    await exerciseAsyncIterator(response);
    expect(mockBattleHistoryApi).toBeCalledTimes(2);
    expect(mockBattleHistoryApi.mock.calls).toBeArrayOfSize(2);
  });
  it.todo("Allows a request limit to be specified");
  it.todo("Allows a constructor to be passed for results");
  it.todo("Allows a filter to be passed");
});
