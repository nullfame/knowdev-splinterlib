---
inject: true
to: package.json
after: scripts
skip_if: test:spec:<%= name %>.<%= subtype %>
---
    "test:spec:<%= name %>.<%= subtype %>": "jest ./src/<%= subtypes %>/__tests__/<%= name %>.<%= subtype %>.spec.js",
