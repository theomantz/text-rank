class Lexicon {
  constructor() {
    this.lexicon = require("../lib/lexicon");
  }

  /**
   * A function returning a Boolean value for inclusion in the lexicon file
   * @param {String} w word to be checked for inclusion in lexicon file
   * @returns {Boolean} true or false if word is included
   */
  
  has(w) {
    let tags = this.lexicon[w];
    if (tags != null) return true;
    return false;
  }

  get tags(w) {
    if (!this.has(w)) return false;
    return this.lexicon[w];
  }

  set tags(w, tags) {
    if (this.has(w)) return false;
    this.lexicon[w] = tags;
    return this.lexicon[w];
  }

}

module.exports = new Lexicon();
