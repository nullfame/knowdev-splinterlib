---
to: src/__tests__/<%= name %>.spec.js
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

describe("<%= Name %>", () => {
  it("Works", async () => {
    const <%= name %> = require("../<%= name %>");
    const response = await <%= name %>();
    console.log("response :>> ", response);
    expect(response.statusCode).toBe(200);
  });
});
