// Sentence Splitter Class extends Splitter Class
const Splitter = require("./Splitter");

// RegExp Patterns
const newLine = /((?:\r?\n|\r)+)/;
const clean = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
const punctuation = /[,-./]/g;
class SentenceSplitter extends Splitter {
  /**
   *
   * @param {string} str
   * @returns an Array of split sentences
   */

  newLine(str) {
    return str.split(newLine);
  }

  punctuation(str) {
    return str.split(punctuation);
  }

  clean(str) {
    let result = str.replace(clean, "");
    return result.replace(newLine, "");
  }

  sentences(str) {
    const { newLine, clean, punctuation } = this;
    let arr = newLine(str);
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      let s = arr[i].trim();
      if (s !== "") {
        let arr2 = punctuation(s);
        for (let j = 0; j < arr2.length; j++) {
          let s2 = arr2[j].trim();
          if (s2 !== "") result.push(clean(s2));
        }
      }
    }
    return result;
  }
}

module.exports = SentenceSplitter;
