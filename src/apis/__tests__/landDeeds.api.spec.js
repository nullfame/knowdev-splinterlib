const log = require("@knowdev/log");

const Splinterlib = require("../..");

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

describe("LandDeeds api", () => {
  it("Works", async () => {
    const response = await Splinterlib.landDeeds(TEST.REGION_ID);
    expect(response).toBeArray();
  });
});
