// Sentence Splitter Class extends Splitter Class
const Splitter = require("./Splitter");

// RegExp Patterns
const newLine = /((?:\r?\n|\r)+)/;
const clean = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
const punctuation = /[,-./]/g;

class SentenceSplitter extends Splitter {
  /**
   * newLine method
   * @param {string} str
   * @returns an Array of split sentences
   */

  newLine(str) {
    return str.split(newLine);
  }

  /**
   * punctuation method
   * @param {String} str input string
   * @returns an array of the input string split at punctuation marks
   */
  punctuation(str) {
    return str.split(punctuation);
  }

  /**
   * clean method
   * @param {String} str input string
   * @returns a string with all of the extraneous characters removed and replaced with ""
   */

  clean(str) {
    let result = str.replace(clean, "");
    return result.replace(newLine, "");
  }

  /**
   * sentences method
   * @param {String} str input string
   * @returns an array of sentences, split at newline characters and punctuation and cleaned of extra
   * using two methods above
   */

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

  words(str) {
    return str.split(" ");
  }
}

// Exporting a new instance of class since there is no need to create a new instance
// Each time since the object instance has no properties
module.exports = new SentenceSplitter();
