const log = require("@knowdev/log");
const cloneDeep = require("lodash.clonedeep");

const Splinterlib = require("../..");
const { CORE } = require("../../util/constants");
const FIXTURE_LAND_DEED_MAP_RESULTS = require("../../__tests__/fixtures/landDeedMap.results.json");

Splinterlib.setLogger(log);

//
//
// Mock constants
//

const TEST = {
  REGION_ID: 16,
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
  mockAxiosResponseData = cloneDeep(FIXTURE_LAND_DEED_MAP_RESULTS);
});
afterEach(() => {
  process.env = DEFAULT_ENV;
  jest.clearAllMocks();
});

//
//
// Run tests
//

describe("LandDeeds api", () => {
  it("Works", async () => {
    const response = await Splinterlib.landDeeds(TEST.REGION_ID);
    expect(response).toBeArray();
  });
  it("Can call QA server", async () => {
    const response = await Splinterlib.landDeeds(TEST.REGION_ID, { qa: true });
    expect(response).toBeArray();
    expect(mockAxios).toBeCalled();
    expect(mockAxios.mock.calls[0][0].url).toBe(CORE.ENDPOINT.QA.LAND_DEEDS);
  });
});
