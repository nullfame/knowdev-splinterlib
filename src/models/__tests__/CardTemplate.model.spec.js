const CardTemplate = require("../CardTemplate.model");
const rawCardArray = require("../../../data/cardDetails.json");

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

describe("CardTemplate model", () => {
  it("Works", () => {
    const template = new CardTemplate();
    expect(template).toBeObject();
  });
  it("Is a class", () => {
    expect(CardTemplate).toBeClass();
  });
  it("Instantiates card object", () => {
    const pirateCaptain = new CardTemplate(rawCardArray[11]);
    expect(pirateCaptain).toBeObject();
  });
});
