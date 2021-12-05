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
  });
  it("Exposes functions", () => {
    expect(Splinterlib.battleFilter).toBeFunction();
    expect(Splinterlib.battleHistoryApi).toBeFunction();
    expect(Splinterlib.battleHistoryAsyncIterator).toBeFunction();
  });
  it("Exposes all card formats", () => {
    expect(Splinterlib.ALL.CARD.EDITIONS).toBeArray();
  });
  it("Exposes all card rarities", () => {
    expect(Splinterlib.ALL.CARD.RARITIES).toBeArrayOfSize(4);
  });
  it("Exposes all card types", () => {
    expect(Splinterlib.ALL.CARD.TYPES).toBeArrayOfSize(2);
  });
  it("Exposes all splinters", () => {
    expect(Splinterlib.ALL.SPLINTERS).toBeArrayOfSize(7);
  });
  it("Exposes all abilities", () => {
    expect(Splinterlib.ALL.ABILITIES).toBeArray();
  });
});
