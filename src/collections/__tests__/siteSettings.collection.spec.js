const siteSettings = require("../siteSettings.collection");

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

describe("SiteSettings collection", () => {
  it("Works", () => {
    expect(siteSettings).toBeObject();
    expect(siteSettings.combine_rates).toBeArray();
    expect(siteSettings.combine_rates_gold).toBeArray();
  });
  it.todo("Can refresh from live data (siteSettings.refresh())");
  it.todo(
    "Will pull from live data based on env (SPLINTERLIB_FETCH_SETTINGS=true)"
  );
});
