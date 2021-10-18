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
  it("Exposes constants", () => {
    expect(Splinterlib.CARD).toBeObject();
  });
  it("Exposes constants but not CORE", () => {
    expect(Splinterlib.CORE).not.toBeObject();
    expect(Splinterlib.CORE).toBeUndefined();
    console.log("Splinterlib :>> ", Splinterlib);
  });
});
