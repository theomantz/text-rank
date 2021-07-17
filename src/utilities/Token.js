// Token class which will contain the word & PoS tag for each word

class Token {
  constructor(w) {
    this.word = w;
    this.pos = undefined;
  }

  setPoS(pos) {
    this.pos = pos;
    return { word: this.word, pos: this.pos };
  }
}

module.exports = Token;
