const cloneDeep = require("lodash.clonedeep");

const Splinterlib = require("../..");
const rawCardArray = require("../../../data/cardDetails.json");

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
  mockAxiosResponseData = cloneDeep(rawCardArray);
});
afterEach(() => {
  process.env = DEFAULT_ENV;
});

//
//
// Run tests
//

describe("Card Details API", () => {
  it("Works", async () => {
    const response = await Splinterlib.cardDetailsApi();
    expect(response).toBeArray();
    expect(mockAxios).toBeCalled();
  });
});
