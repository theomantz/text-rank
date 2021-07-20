const Token = require("./Token");
const Lexicon = require("../utilities/Lexicon");

function tokenizer(word) {
  return new Token(word);
}

module.exports = tokenizer;
