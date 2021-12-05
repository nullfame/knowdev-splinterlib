const cloneDeep = require("lodash.clonedeep");

const cards = require("../cardUniverse.collection");
const rawCardArray = require("../../../data/cardDetails.json");

//
//
// Mock constants
//

//
//
// Mock modules
//

const mockCardDetailsApi = jest.fn();
jest.mock(
  "../../apis/cardDetails.api",
  () => (params) => mockCardDetailsApi(params)
);

//
//
// Mock environment
//

const DEFAULT_ENV = process.env;
beforeEach(() => {
  jest.clearAllMocks();
  mockCardDetailsApi.mockReturnValue(cloneDeep(rawCardArray));
  process.env = { ...process.env };
});
afterEach(() => {
  process.env = DEFAULT_ENV;
  jest.clearAllMocks();
});

//
//
// Run tests
//

describe("Cards collection", () => {
  describe("Refresh function", () => {
    it("Can refresh from live data (cards.refresh())", async () => {
      mockCardDetailsApi.mockReturnValue([{ id: 12, name: "Haunted Goose" }]);
      await cards.refresh();
      expect(mockCardDetailsApi).toBeCalled();
      const card = cards.getTemplate(12);
      expect(card).toBeObject();
      expect(card.name).toBe("Haunted Goose");
    });
    it("Can refresh from live qa (cards.refresh({qa:true}))", async () => {
      mockCardDetailsApi.mockReturnValue([{ id: 12, name: "Haunted Goose" }]);
      await cards.refresh({ qa: true });
      expect(mockCardDetailsApi).toHaveBeenCalledWith({ qa: true });
    });
    it("Will pull from live data based on env (SPLINTERLIB_FETCH_CARDS=true)", async () => {
      expect(mockCardDetailsApi).not.toBeCalled();
      process.env.SPLINTERLIB_FETCH_CARDS = true;
      // Reset the module cache, re-require the module, and see if we have a different outcome
      jest.resetModules();
      // eslint-disable-next-line global-require
      require("../cardUniverse.collection");
      expect(mockCardDetailsApi).toBeCalled();
    });
    it("Will pull from live data based on env (SPLINTERLIB_FETCH=true)", async () => {
      expect(mockCardDetailsApi).not.toBeCalled();
      process.env.SPLINTERLIB_FETCH = true;
      // Reset the module cache, re-require the module, and see if we have a different outcome
      jest.resetModules();
      // eslint-disable-next-line global-require
      require("../cardUniverse.collection");
      expect(mockCardDetailsApi).toBeCalled();
    });
    it("Won't pull live data if SPLINTERLIB_FETCH_CARDS=false", async () => {
      expect(mockCardDetailsApi).not.toBeCalled();
      process.env.SPLINTERLIB_FETCH = true;
      process.env.SPLINTERLIB_FETCH_CARDS = false;
      // Reset the module cache, re-require the module, and see if we have a different outcome
      jest.resetModules();
      // eslint-disable-next-line global-require
      require("../cardUniverse.collection");
      expect(mockCardDetailsApi).not.toBeCalled();
    });
  });
});
