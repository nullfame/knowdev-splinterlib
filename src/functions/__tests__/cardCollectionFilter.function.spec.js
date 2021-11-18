const cardCollectionFilter = require("../cardCollectionFilter.function");
const cards = require("../../collections/cardUniverse.collection");
const {
  ABILITY,
  BATTLE,
  CARD,
  FILTER,
  SPLINTER,
} = require("../../util/constants");

//
//
// Mock constants
//

const ID = {
  EPONA: 297,
  GOLD_DRAGON: 59,
  MAGGOTS: 135,
  PEACEFUL_GIANT: 60,
  SERPENTINE_SOLDIER: 6,
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

describe("CardCollectionFilter function", () => {
  it("Is a function", () => {
    expect(cardCollectionFilter).toBeFunction();
  });
  it("Is returns a function", () => {
    expect(cardCollectionFilter()).toBeFunction();
  });
  describe("Abilities", () => {
    it("Filters by ability", () => {
      const sample = [
        cards.getTemplate(ID.MAGGOTS),
        cards.getTemplate(ID.EPONA),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ ability: ABILITY.IMMUNITY })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe(ID.EPONA);
    });
    it("Filters by multiple abilities", () => {
      const sample = [
        cards.getTemplate(ID.MAGGOTS),
        cards.getTemplate(ID.EPONA),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ ability: [ABILITY.IMMUNITY, ABILITY.SCAVENGER] })
      );
      expect(filtered.length).toBe(2);
      expect(filtered[0].id).toBe(ID.MAGGOTS);
      expect(filtered[1].id).toBe(ID.EPONA);
    });
    it("Filters by multiple abilities with 'and' (return zero)", () => {
      const sample = [
        cards.getTemplate(ID.MAGGOTS),
        cards.getTemplate(ID.EPONA),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({
          ability: [ABILITY.IMMUNITY, ABILITY.SCAVENGER],
          abilityAnd: true,
        })
      );
      expect(filtered.length).toBe(0);
    });
    it("Filters by multiple abilities with 'and' (return one)", () => {
      const sample = [
        cards.getTemplate(ID.MAGGOTS),
        cards.getTemplate(ID.EPONA),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({
          ability: [ABILITY.DIVINE_SHIELD, ABILITY.IMMUNITY],
          abilityAnd: true,
        })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe(ID.EPONA);
    });
  });
  describe("Edition", () => {
    it("Filters by edition (post-beta)", () => {
      const sample = [
        cards.getTemplate(ID.MAGGOTS),
        cards.getTemplate(ID.EPONA),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ edition: CARD.EDITION.DICE })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe(ID.EPONA);
    });
    it("Filters by edition (alpha)", () => {
      const sample = [
        cards.getTemplate(ID.GOLD_DRAGON),
        cards.getTemplate(ID.PEACEFUL_GIANT),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ edition: CARD.EDITION.ALPHA })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe(ID.GOLD_DRAGON);
    });
    it("Filters by edition (beta)", () => {
      const sample = [
        cards.getTemplate(ID.GOLD_DRAGON),
        cards.getTemplate(ID.PEACEFUL_GIANT),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ edition: CARD.EDITION.BETA })
      );
      expect(filtered.length).toBe(2);
      expect(filtered[0].id).toBe(ID.GOLD_DRAGON);
      expect(filtered[1].id).toBe(ID.PEACEFUL_GIANT);
    });
    it("Filters by edition (alpha,beta; works like beta)", () => {
      const sample = [
        cards.getTemplate(ID.GOLD_DRAGON),
        cards.getTemplate(ID.PEACEFUL_GIANT),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ edition: CARD.EDITION.ALPHA_BETA })
      );
      expect(filtered.length).toBe(2);
      expect(filtered[0].id).toBe(ID.GOLD_DRAGON);
      expect(filtered[1].id).toBe(ID.PEACEFUL_GIANT);
    });
  });
  describe("Format", () => {
    it("Filters by format", () => {
      const sample = [
        cards.getTemplate(ID.MAGGOTS),
        cards.getTemplate(ID.EPONA),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ format: BATTLE.FORMAT.UNTAMED })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe(ID.MAGGOTS);
    });
  });
  describe("Mana", () => {
    it("Filters by exact mana (Epona)", () => {
      const sample = [
        cards.getTemplate(ID.MAGGOTS),
        cards.getTemplate(ID.EPONA),
      ];
      const filtered = sample.filter(cardCollectionFilter({ mana: 1 }));
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe(ID.EPONA);
    });
    it("Filters by exact mana (Maggots)", () => {
      const sample = [
        cards.getTemplate(ID.MAGGOTS),
        cards.getTemplate(ID.EPONA),
      ];
      const filtered = sample.filter(cardCollectionFilter({ mana: 3 }));
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe(ID.MAGGOTS);
    });
    it("Filters by exact mana (Array)", () => {
      const sample = [
        cards.getTemplate(ID.MAGGOTS),
        cards.getTemplate(ID.EPONA),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ mana: { [FILTER.IS]: 3 } })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe(ID.MAGGOTS);
    });
    it("Filters by mana, greater than", () => {
      const sample = [
        cards.getTemplate(ID.SERPENTINE_SOLDIER),
        cards.getTemplate(ID.MAGGOTS),
        cards.getTemplate(ID.EPONA),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ mana: { [FILTER.GREATER_THAN]: 3 } })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe(ID.SERPENTINE_SOLDIER);
    });
    it("Filters by mana, greater than or equal", () => {
      const sample = [
        cards.getTemplate(ID.SERPENTINE_SOLDIER),
        cards.getTemplate(ID.MAGGOTS),
        cards.getTemplate(ID.EPONA),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ mana: { [FILTER.GREATER_THAN_OR_EQUAL]: 3 } })
      );
      expect(filtered.length).toBe(2);
      expect(filtered[0].id).toBe(ID.SERPENTINE_SOLDIER);
      expect(filtered[1].id).toBe(ID.MAGGOTS);
    });
    it("Filters by mana, less than", () => {
      const sample = [
        cards.getTemplate(ID.SERPENTINE_SOLDIER),
        cards.getTemplate(ID.MAGGOTS),
        cards.getTemplate(ID.EPONA),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ mana: { [FILTER.LESS_THAN]: 3 } })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe(ID.EPONA);
    });
    it("Filters by mana, less than or equal", () => {
      const sample = [
        cards.getTemplate(ID.SERPENTINE_SOLDIER),
        cards.getTemplate(ID.MAGGOTS),
        cards.getTemplate(ID.EPONA),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ mana: { [FILTER.LESS_THAN_OR_EQUAL]: 3 } })
      );
      expect(filtered.length).toBe(2);
      expect(filtered[0].id).toBe(ID.MAGGOTS);
      expect(filtered[1].id).toBe(ID.EPONA);
    });
  });
  describe("Name", () => {
    it("Matches name first word", () => {
      const sample = [
        cards.getTemplate(ID.GOLD_DRAGON),
        cards.getTemplate(ID.PEACEFUL_GIANT),
      ];
      const filtered = sample.filter(cardCollectionFilter({ name: "Gold" }));
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe(ID.GOLD_DRAGON);
    });
    it("Matches name partial word", () => {
      const sample = [
        cards.getTemplate(ID.GOLD_DRAGON),
        cards.getTemplate(ID.PEACEFUL_GIANT),
      ];
      const filtered = sample.filter(cardCollectionFilter({ name: "Peace" }));
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe(ID.PEACEFUL_GIANT);
    });
    it("Matches name any word when match any true", () => {
      const sample = [
        cards.getTemplate(ID.GOLD_DRAGON),
        cards.getTemplate(ID.PEACEFUL_GIANT),
        cards.getTemplate(ID.MAGGOTS),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ name: "AG", nameMatchAny: true })
      );
      expect(filtered.length).toBe(2);
      expect(filtered[0].id).toBe(ID.GOLD_DRAGON);
      expect(filtered[1].id).toBe(ID.MAGGOTS);
    });
    it("Doesn't match when match any false (default)", () => {
      const sample = [
        cards.getTemplate(ID.GOLD_DRAGON),
        cards.getTemplate(ID.PEACEFUL_GIANT),
        cards.getTemplate(ID.MAGGOTS),
      ];
      const filtered = sample.filter(cardCollectionFilter({ name: "AG" }));
      expect(filtered.length).toBe(0);
    });
  });
  describe("Rarity", () => {
    it("Rarity single", () => {
      const sample = [
        cards.getTemplate(ID.SERPENTINE_SOLDIER),
        cards.getTemplate(ID.MAGGOTS),
        cards.getTemplate(ID.EPONA),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ rarity: CARD.RARITY.LEGENDARY })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe(ID.EPONA);
    });
    it("Rarity array of one", () => {
      const sample = [
        cards.getTemplate(ID.SERPENTINE_SOLDIER),
        cards.getTemplate(ID.MAGGOTS),
        cards.getTemplate(ID.EPONA),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ rarity: [CARD.RARITY.LEGENDARY] })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe(ID.EPONA);
    });
    it("Rarity array of many", () => {
      const sample = [
        cards.getTemplate(ID.SERPENTINE_SOLDIER),
        cards.getTemplate(ID.MAGGOTS),
        cards.getTemplate(ID.EPONA),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ rarity: [CARD.RARITY.COMMON, CARD.RARITY.RARE] })
      );
      expect(filtered.length).toBe(2);
      expect(filtered[0].id).toBe(ID.SERPENTINE_SOLDIER);
      expect(filtered[1].id).toBe(ID.MAGGOTS);
    });
  });
  describe("Splinter", () => {
    it("Filters on a single splinter", () => {
      const sample = [
        cards.getTemplate(ID.SERPENTINE_SOLDIER),
        cards.getTemplate(ID.MAGGOTS),
        cards.getTemplate(ID.EPONA),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ splinter: SPLINTER.EARTH })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe(ID.EPONA);
    });
    it("Filters on an array of one splinter", () => {
      const sample = [
        cards.getTemplate(ID.SERPENTINE_SOLDIER),
        cards.getTemplate(ID.MAGGOTS),
        cards.getTemplate(ID.EPONA),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ splinter: [SPLINTER.DEATH] })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe(ID.MAGGOTS);
    });
    it("Filters on an array of several splinters", () => {
      const sample = [
        cards.getTemplate(ID.SERPENTINE_SOLDIER),
        cards.getTemplate(ID.MAGGOTS),
        cards.getTemplate(ID.EPONA),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ splinter: [SPLINTER.DEATH, SPLINTER.FIRE] })
      );
      expect(filtered.length).toBe(2);
      expect(filtered[0].id).toBe(ID.SERPENTINE_SOLDIER);
      expect(filtered[1].id).toBe(ID.MAGGOTS);
    });
  });
  describe("Type", () => {
    it("Filters by type monster", () => {
      const sample = [cards.getTemplate(5), cards.getTemplate(ID.EPONA)];
      const filtered = sample.filter(
        cardCollectionFilter({ type: CARD.TYPE.MONSTER })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe(ID.EPONA);
    });
    it("Filters by type summoner", () => {
      const sample = [cards.getTemplate(5), cards.getTemplate(ID.EPONA)];
      const filtered = sample.filter(
        cardCollectionFilter({ type: CARD.TYPE.SUMMONER })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe("Malric Inferno");
    });
  });
  describe("Multi-filter", () => {
    it("Filters on multiple attributes", () => {
      const sample = [
        cards.getTemplate(ID.SERPENTINE_SOLDIER),
        cards.getTemplate(ID.MAGGOTS),
        cards.getTemplate(268),
        cards.getTemplate(ID.EPONA),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({
          edition: CARD.EDITION.DICE,
          rarity: CARD.RARITY.LEGENDARY,
        })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe(ID.EPONA);
    });
  });
});
