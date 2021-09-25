module.exports = {
  env: {
    es6: true,
    "jest/globals": true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
  },
  plugins: ["jest", "prettier"],
  rules: {
    "prettier/prettier": ["error"],
  },
};
