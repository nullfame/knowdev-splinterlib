---
inject: true
to: package.json
after: scripts
skip_if: test:spec:<%= name %>
---
    "test:spec:<%= name %>": "jest ./src/__tests__/<%= name %>.spec.js",
