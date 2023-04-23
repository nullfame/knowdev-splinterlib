// Export a function that compares two arrays and returns true if they are equal
module.exports = (array1, array2) => {
  // If the arrays are different lengths, they are not equal
  if (array1.length !== array2.length) {
    return false;
  }
  // If the arrays are the same length, compare each item in the array
  for (let i = 0; i < array1.length; i += 1) {
    // If the items are not equal, the arrays are not equal
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  // If we get here, the arrays are equal
  return true;
};
