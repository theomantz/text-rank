// Token class which will contain the word & PoS tag for each word
/* 
  When class instance is created, the lexicon will be searched for PoS tags
  if there are multiple for the word, one will be chosen based on highest priority in
  text-rank calculation
 */
const lexicon = require("../lib/lexicon");

class Token {
  /**
   *
   * @param {String} w word to be tokenized
   * @param {String} pos pos tag from the lexicon which will be used for ranking
   */
  constructor(w) {
    this.word = w;
    this.pos = assignPoS(w);
  }

  /**
   *
   * @param {String} word the word to be takenized with a PoS tag
   * @returns {String} PoS tag to be assigned to the word in the token
   */

  assignPoS(word) {
    if (!lexicon[word]) return null;
    if (lexicon[word].length === 1) return lexicon[word][0];
    const posSet = new Set([
      "NN",
      "NNP",
      "NNPS",
      "NNS",
      "VB",
      "VBD",
      "VBG",
      "VBN",
      "VBP",
      "VBZ",
    ]);
    for (let i = 0; i < lexicon[word].length; i++) {
      if (posSet.has(lexicon[word][i])) return lexicon[word][i];
    }
    return lexicon[word][0];
  }
}

module.exports = Token;
