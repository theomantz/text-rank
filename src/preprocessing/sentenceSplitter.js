// Sentence Splitter Class extends Splitter Class
const Splitter = require("./Splitter");

// RegExp Patterns
const newLine = /((?:\r?\n|\r)+)/;

class SentenceSplitter extends Splitter {
  newLine(str) {
    return str.split(newLine);
  }
}

module.exports = SentenceSplitter;
