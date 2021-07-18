// Token class which will contain the word & PoS tag for each word
/* 
  When class instance is created, the lexicon will be searched for PoS tags
  if there are multiple for the word, one will be chosen based on highest priority in
  text-rank calculation
 */

class Token {
  /**
   *
   * @param {String} w word to be tokenized
   * @param {String} pos pos tag from the lexicon which will be used for ranking
   */
  constructor(w, pos = null) {
    this.word = w;
    this.pos = pos;
  }

  setPoS(pos) {
    this.pos = pos;
    return { word: this.word, pos: this.pos };
  }
}

module.exports = Token;
