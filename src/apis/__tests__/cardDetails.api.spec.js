const cloneDeep = require("lodash.clonedeep");

const Splinterlib = require("../..");
const rawCardArray = require("../../../data/cardDetails.json");
const { CORE } = require("../../util/constants");

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
  jest.clearAllMocks();
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
    expect(mockAxios.mock.calls[0][0].url).toBe(CORE.ENDPOINT.CARD_DETAILS);
  });
  it("Can call QA server", async () => {
    const response = await Splinterlib.cardDetailsApi({ qa: true });
    expect(response).toBeArray();
    expect(mockAxios).toBeCalled();
    expect(mockAxios.mock.calls[0][0].url).toBe(CORE.ENDPOINT.QA.CARD_DETAILS);
  });
});
