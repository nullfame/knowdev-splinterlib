// eslint-disable-next-line no-unused-vars
const Splinterlib = require("../../src");

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

describe("Data cache", () => {
  it.todo("Card details are up to date");
  it.todo("Site settings are up to date");
});
