const { silent } = require("@knowdev/log");
const { description, name, version } = require("../package.json");

//
//
// Core configuration
//

const configuration = {
  log: silent,
};

const Splinterlib = {
  info() {
    configuration.log.info(
      `Splinterlib v${version}\n${description}\nnpm: ${name}`
    );
  },
  setLogger(logger) {
    configuration.log = logger;
  },
};

//
//
// Export
//

module.exports = { configuration, Splinterlib };
