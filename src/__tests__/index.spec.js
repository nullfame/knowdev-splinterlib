const log = require("@knowdev/log");
const Splinterlib = require("..");

//
//
// Run tests
//

describe("Splinterlib", () => {
  it("Works", () => {
    Splinterlib.info();
  });
  it("Prints into with a logger", () => {
    Splinterlib.setLogger(log);
    Splinterlib.info();
  });
});
