const compareArrays = require("../compareArrays.function");

describe("compareArrays", () => {
  // Test with two arrays with the same strings
  it("Returns true for two arrays with the same strings", () => {
    const array1 = ["a", "b", "c"];
    const array2 = ["a", "b", "c"];
    expect(compareArrays(array1, array2)).toBe(true);
  });

  // Test with two arrays with the same strings
  it("Returns true for two arrays with the same strings in different order", () => {
    const array1 = ["a", "b", "c"];
    const array2 = ["b", "c", "a"];
    expect(compareArrays(array1, array2)).toBe(true);
  });

  // Test with two arrays with different strings
  it("Returns false for two arrays with different strings", () => {
    const array1 = ["a", "b", "c"];
    const array2 = ["a", "b", "d"];
    expect(compareArrays(array1, array2)).toBe(false);
  });
});
