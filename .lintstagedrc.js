module.exports = {
  "*.js": [
    "eslint --fix",
    "git add"
  ],
  "package.json": [
    "sort-package-json",
    "git add"
  ],
};
