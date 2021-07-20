/**
 * A lexicon class for encapsulation of the lexicon file. additional getter and
 * setter methods are provided as well as
 */

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

  getTags(w) {
    if (!this.has(w)) return false;
    return this.lexicon[w];
  }

  /**
   * A function to set a word to appropriate tags within the lexion
   * @param {Object} obj an object of form: {w: {String}, tags: {[String]} }
   * @returns {[String]} an array of the tags assigned to the word within the lexion
   */

  setTags(obj) {
    const { w, tags } = obj;
    if (this.has(w)) return false;
    this.lexicon[w] = tags;
    return this.lexicon[w];
  }
}

module.exports = new Lexicon();
