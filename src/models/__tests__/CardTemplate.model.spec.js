const CardTemplate = require("../CardTemplate.model");
const rawCardArray = require("../../../data/cardDetails.json");
const { CARD } = require("../../util/constants");

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
  it("Has formats", () => {
    const pirateCaptain = new CardTemplate(rawCardArray[11]);
    expect(pirateCaptain.formats).toBeArrayOfSize(5);
  });
  it("Monsters have stat ranges", () => {
    const pirateCaptain = new CardTemplate(rawCardArray[11]);
    expect(pirateCaptain.statRange).toBeObject();
    expect(pirateCaptain.statRange[CARD.STAT.MANA]).toBeObject();
    expect(pirateCaptain.statRange[CARD.STAT.MANA].high).toBe(3);
    expect(pirateCaptain.statRange[CARD.STAT.SPEED].low).toBe(2);
    expect(pirateCaptain.statRange[CARD.STAT.SPEED].high).toBe(6);
  });
  it("Summoners have stat ranges", () => {
    const malricInferno = new CardTemplate(rawCardArray[4]);
    expect(malricInferno.statRange).toBeObject();
    expect(malricInferno.statRange[CARD.STAT.MANA]).toBeObject();
    expect(malricInferno.statRange[CARD.STAT.MANA].high).toBe(3);
    expect(malricInferno.statRange[CARD.STAT.SPEED].low).toBe(0);
    expect(malricInferno.statRange[CARD.STAT.SPEED].high).toBe(0);
  });
});
