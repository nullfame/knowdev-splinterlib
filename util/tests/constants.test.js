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
  it.todo("Abilities are up to date");
  it.todo("Editions are up to date");
  it.todo("Rulesets are up to date");
});
