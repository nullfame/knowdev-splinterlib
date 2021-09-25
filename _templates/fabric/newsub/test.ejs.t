---
to: src/<%= subtypes %>/__tests__/<%= name %>.<%= subtype %>.spec.js
---
/* eslint-disable global-require */

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

describe("<%= Name %> <%= subtype %>", () => {
  it("Works", async () => {
    const <%= name %> = require("../<%= name %>.<%= subtype %>");
    const response = await <%= name %>();
    console.log("response :>> ", response);
    expect(response.statusCode).toBe(200);
  });
});
