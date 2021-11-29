const CardTemplate = require("../CardTemplate.model");
const rawCardArray = require("../../../data/cardDetails.json");
const { ABILITY, CARD, SPLINTER } = require("../../util/constants");

//
//
// Mock constants
//

const RAW = {
  MALRIC_INFERNO: rawCardArray[4],
  PIRATE_CAPTAIN: rawCardArray[11],
  FURIOUS_CHICKEN: rawCardArray[130],
  MYLOR_CROWLING: rawCardArray[258],
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

describe("CardTemplate model", () => {
  it("Works", () => {
    const template = new CardTemplate();
    expect(template).toBeObject();
  });
  it("Is a class", () => {
    expect(CardTemplate).toBeClass();
  });
  it("Instantiates card object", () => {
    const pirateCaptain = new CardTemplate(RAW.PIRATE_CAPTAIN);
    expect(pirateCaptain).toBeObject();
  });
  it("Has formats", () => {
    const pirateCaptain = new CardTemplate(RAW.PIRATE_CAPTAIN);
    expect(pirateCaptain.formats).toBeArrayOfSize(5);
  });
  it("Has splinters (water)", () => {
    const pirateCaptain = new CardTemplate(RAW.PIRATE_CAPTAIN);
    expect(pirateCaptain.splinter).toBe(SPLINTER.WATER);
  });
  it("Has splinters (neutral)", () => {
    const furiousChicken = new CardTemplate(RAW.FURIOUS_CHICKEN);
    expect(furiousChicken.splinter).not.toBeUndefined();
    expect(furiousChicken.splinter).toBe(SPLINTER.NEUTRAL);
  });
  it("Monsters have stat ranges", () => {
    const pirateCaptain = new CardTemplate(RAW.PIRATE_CAPTAIN);
    expect(pirateCaptain.statRange).toBeObject();
    expect(pirateCaptain.statRange[CARD.STAT.MANA]).toBeObject();
    expect(pirateCaptain.statRange[CARD.STAT.MANA].high).toBe(3);
    expect(pirateCaptain.statRange[CARD.STAT.SPEED].low).toBe(2);
    expect(pirateCaptain.statRange[CARD.STAT.SPEED].high).toBe(6);
  });
  it("Summoners have stat ranges", () => {
    const malricInferno = new CardTemplate(RAW.MALRIC_INFERNO);
    expect(malricInferno.statRange).toBeObject();
    expect(malricInferno.statRange[CARD.STAT.MANA]).toBeObject();
    expect(malricInferno.statRange[CARD.STAT.MANA].high).toBe(3);
    expect(malricInferno.statRange[CARD.STAT.SPEED].low).toBe(0);
    expect(malricInferno.statRange[CARD.STAT.SPEED].high).toBe(0);
  });
  it("Monsters have abilities", () => {
    const pirateCaptain = new CardTemplate(RAW.PIRATE_CAPTAIN);
    expect(pirateCaptain.abilities).toBeArray();
    expect(pirateCaptain.abilities).toIncludeSameMembers([
      ABILITY.INSPIRE,
      ABILITY.SNIPE,
    ]);
  });
  it("Summoners grant abilities", () => {
    const mylorCrowling = new CardTemplate(RAW.MYLOR_CROWLING);
    expect(mylorCrowling.abilities).toBeArray();
    expect(mylorCrowling.abilities).toIncludeSameMembers([ABILITY.THORNS]);
  });
});
