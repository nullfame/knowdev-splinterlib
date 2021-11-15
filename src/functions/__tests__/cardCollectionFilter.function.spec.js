const cardCollectionFilter = require("../cardCollectionFilter.function");
const cards = require("../../collections/cardUniverse.collection");
const { BATTLE, CARD, FILTER } = require("../../util/constants");

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

describe("CardCollectionFilter function", () => {
  it("Is a function", () => {
    expect(cardCollectionFilter).toBeFunction();
  });
  it("Is returns a function", () => {
    expect(cardCollectionFilter()).toBeFunction();
  });
  describe("Abilities", () => {
    it.todo("Filters by ability");
    it.todo("Filters by multiple abilities");
    it.todo("Filters by multiple abilities with 'and'");
  });
  describe("Edition", () => {
    it("Filters by edition (post-beta)", () => {
      const sample = [
        {
          id: 135,
          name: "Maggots",
          color: "Black",
          editions: "4",
        },
        {
          id: 297,
          name: "Epona",
          color: "Green",
          editions: "5",
        },
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ edition: CARD.EDITION.DICE })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe("Epona");
    });
    it("Filters by edition (alpha)", () => {
      const sample = [
        {
          id: 59,
          name: "Gold Dragon",
          color: "Gold",
          editions: "0,1",
        },
        {
          id: 60,
          name: "Peaceful Giant",
          color: "Gray",
          editions: "1",
        },
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ edition: CARD.EDITION.ALPHA })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe("Gold Dragon");
    });
    it("Filters by edition (beta)", () => {
      const sample = [
        {
          id: 59,
          name: "Gold Dragon",
          color: "Gold",
          editions: "0,1",
        },
        {
          id: 60,
          name: "Peaceful Giant",
          color: "Gray",
          editions: "1",
        },
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ edition: CARD.EDITION.BETA })
      );
      expect(filtered.length).toBe(2);
      expect(filtered[0].name).toBe("Gold Dragon");
      expect(filtered[1].name).toBe("Peaceful Giant");
    });
    it("Filters by edition (alpha,beta; works like beta)", () => {
      const sample = [
        {
          id: 59,
          name: "Gold Dragon",
          color: "Gold",
          editions: "0,1",
        },
        {
          id: 60,
          name: "Peaceful Giant",
          color: "Gray",
          editions: "1",
        },
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ edition: CARD.EDITION.ALPHA_BETA })
      );
      expect(filtered.length).toBe(2);
      expect(filtered[0].name).toBe("Gold Dragon");
      expect(filtered[1].name).toBe("Peaceful Giant");
    });
  });
  describe("Format", () => {
    it("Filters by format", () => {
      const sample = [cards.getTemplate(135), cards.getTemplate(297)];
      const filtered = sample.filter(
        cardCollectionFilter({ format: BATTLE.FORMAT.UNTAMED })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe("Maggots");
    });
  });
  describe("Mana", () => {
    it("Filters by exact mana (Epona)", () => {
      const sample = [cards.getTemplate(135), cards.getTemplate(297)];
      const filtered = sample.filter(cardCollectionFilter({ mana: 1 }));
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe("Epona");
    });
    it("Filters by exact mana (Maggots)", () => {
      const sample = [cards.getTemplate(135), cards.getTemplate(297)];
      const filtered = sample.filter(cardCollectionFilter({ mana: 3 }));
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe("Maggots");
    });
    it("Filters by exact mana (Array)", () => {
      const sample = [cards.getTemplate(135), cards.getTemplate(297)];
      const filtered = sample.filter(
        cardCollectionFilter({ mana: { [FILTER.IS]: 3 } })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe("Maggots");
    });
    it("Filters by mana, greater than", () => {
      const sample = [
        cards.getTemplate(6),
        cards.getTemplate(135),
        cards.getTemplate(297),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ mana: { [FILTER.GREATER_THAN]: 3 } })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe("Serpentine Soldier");
    });
    it("Filters by mana, greater than or equal", () => {
      const sample = [
        cards.getTemplate(6),
        cards.getTemplate(135),
        cards.getTemplate(297),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ mana: { [FILTER.GREATER_THAN_OR_EQUAL]: 3 } })
      );
      expect(filtered.length).toBe(2);
      expect(filtered[0].name).toBe("Serpentine Soldier");
      expect(filtered[1].name).toBe("Maggots");
    });
    it("Filters by mana, less than", () => {
      const sample = [
        cards.getTemplate(6),
        cards.getTemplate(135),
        cards.getTemplate(297),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ mana: { [FILTER.LESS_THAN]: 3 } })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe("Epona");
    });
    it("Filters by mana, less than or equal", () => {
      const sample = [
        cards.getTemplate(6),
        cards.getTemplate(135),
        cards.getTemplate(297),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ mana: { [FILTER.LESS_THAN_OR_EQUAL]: 3 } })
      );
      expect(filtered.length).toBe(2);
      expect(filtered[0].name).toBe("Maggots");
      expect(filtered[1].name).toBe("Epona");
    });
  });
  describe("Rarity", () => {
    it("Rarity single", () => {
      const sample = [
        cards.getTemplate(6),
        cards.getTemplate(135),
        cards.getTemplate(297),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ rarity: CARD.RARITY.LEGENDARY })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe("Epona");
    });
    it("Rarity array of one", () => {
      const sample = [
        cards.getTemplate(6),
        cards.getTemplate(135),
        cards.getTemplate(297),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ rarity: [CARD.RARITY.LEGENDARY] })
      );
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe("Epona");
    });
    it("Rarity array of many", () => {
      const sample = [
        cards.getTemplate(6),
        cards.getTemplate(135),
        cards.getTemplate(297),
      ];
      const filtered = sample.filter(
        cardCollectionFilter({ rarity: [CARD.RARITY.COMMON, CARD.RARITY.RARE] })
      );
      expect(filtered.length).toBe(2);
      expect(filtered[0].name).toBe("Serpentine Soldier");
      expect(filtered[1].name).toBe("Maggots");
    });
  });
});
