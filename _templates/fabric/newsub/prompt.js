// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: "input",
    name: "name",
    message: "File name:",
  },
  {
    type: "input",
    name: "subtype",
    message: "Subtype (singular):",
  },
  {
    type: "input",
    name: "subtypes",
    message: "Subtype (plural):",
  },
];
