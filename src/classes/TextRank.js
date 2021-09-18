// Class Imports

const SentenceSplitter = require("../utilities/SentenceSplitter");
const Token = require("../utilities/Token");

// Error Class Imports
const ValidationError = require("../errors/ValidationError");

class TextRank {
  /**
   * constructor method to create a new instance of the text rank class
   * @param {String} type Type of extraction to perform; keyword - k, sentence - s;
   * @param {[String]} PoS PoS candidate tags defaults to [N: all nouns, V: all verbs]
   * @param {Float} dampingCoeff the dampening coefficient, defaults to 0.85
   * @param {Float} minDiff the convergence threshold defaults to 0.00001
   * @param {Integer} steps the number of iteration steps defaults to 10
   * @param {Integer} nodeWeight
   */
  constructor(
    type = "k",
    PoS = ["N", "V"],
    dampingCoeff = 0.85,
    minDiff = 0.00001,
    steps = 10,
    nodeWeight = null
  ) {
    this.type = this.checkType(type) ? type : "k";
    this.pos = this.normalizePos(PoS);
    this.dampingCoeff = this.checkFloat(dampingCoeff) ? dampingCoeff : 0.85;
    this.minDiff = this.checkFloat(minDiff) ? minDiff : 0.00001;
    this.steps = this.checkInt(steps) ? steps : 10;
    this.nodeWeight = nodeWeight;
    this.sentences = null;
    this.tokens = [];
    this.words = [];
  }

  /**
   * checking if the inputted type is a string and matches one of the acceptable
   * types. If not, returning k and algorithm will perform keyword extraction
   * @param {String} type type of extration to perform
   * @returns boolean
   */

  checkType(type) {
    type = type.toLowerCase();
    return String(type) === type && (type === "k" || type === "s");
  }

  /**
   * a function to check if an input is of type float
   * @param {Number} n object to be checked
   * @returns Boolean value indicating whether or not object is type float
   */

  checkFloat(n) {
    return Number(n) === n && n % 1 !== 0;
  }

  /**
   * a function to check if an inptu is of type integer
   * @param {Number} n input object to be checked
   * @returns Boolean value indicating whether or not an object is type integer
   */

  checkInt(n) {
    return Number(n) === n && n % 1 === 0;
  }

  /**
   * A function which normalizes user inputted PoS tags
   * Checks for inclusivity in candidate PoS tag set
   * Allows for some short hand notation e.g. 'N' adds all of the noun-type
   * PoS tags to the admitted PoS tag set object
   * @param {[String]} pos candidate PoS tags
   * @returns {Set({String})} a Set object of user chosen PoS Tags
   */

  normalizePos(pos) {
    // Check that input is an instance of the Array objet
    if (!(pos instanceof Array)) {
      throw new ValidationError("PoS tags must be inputted as an array");
    }

    // Initialize set object with all candidate PoS tags
    const candidateTags = new Set([
      "CC",
      "CD",
      "DT",
      "EX",
      "FW",
      "IN",
      "JJ",
      "JJR",
      "JJS",
      "LS",
      "MD",
      "NN",
      "NNP",
      "NNPS",
      "NNS",
      "POS",
      "PDT",
      "PRP$",
      "PRP",
      "RB",
      "RBR",
      "RBS",
      "RP",
      "SYM",
      "TO",
      "UH",
      "VB",
      "VBD",
      "VBG",
      "VBN",
      "VBP",
      "VBZ",
      "WDT",
      "WP",
      "WP$",
      "WRB",
    ]);
    const POS = new Set();
    for (let i = 0; i < pos.length; i++) {
      // Check that each value in the pos array is of type string
      // Throw validation error if not
      if (typeof pos[i] !== "string") {
        throw new ValidationError("candidate PoS tags must be of type string");
      }
      let candidate = pos[i].toUpperCase();
      if (candidate === "N") {
        POS.add(["NN", "NNP", "NNPS", "NNS"]);
      } else if (candidate === "V") {
        POS.add(["VB", "VBD", "VBG", "VBN", "VBP", "VBZ"]);
      } else if (candidate === "J") {
        POS.add(["JJ", "JJR", "JJS"]);
      } else {
        if (candidateTags.has(candidate)) {
          POS.add(candidate);
        } else {
          throw new ValidationError(
            "candidate PoS tags must be chosen from the available tags. available tags are listed in the README"
          );
        }
      }
    }
    return POS;
  }

  /**
   * Simple function for encapsulation of the splitting of the main string
   * into sentences
   * @param {String} str input string to be split into sentences
   * @returns {[String]} array of sentence strings
   */

  splitSentences(str) {
    return SentenceSplitter.sentences(str);
  }

  splitWords(str) {}

  /**
   * createTokens function which takes the input string and creates a token array
   * which is then assigned as an object property
   * @param {String} string input string
   *
   */

  createTokens(string) {
    // Save the input string as an object property
    this.string = string;
    // Split the string into sentences using the StringSplitter class method
    this.sentences = this.splitSentences(string);
    // Instatiate the object property tokens array to store the tokenized words
    this.tokens = new Array(this.sentences.length);

    // Iterate over the split sentences
    for (let i = 0; i < this.sentences.length; i++) {
      // Set the object property words array at index position i to the sentence
      // from the sentences array index position i split at whitespace which results in
      // An array of words
      this.words[i] = this.sentences[i].split(" ");
      for (let j = 0; j < this.words[i].length; j++) {
        // Trim the words of whitespace
        this.words[i][j] = this.words[i][j].trim();
        // Create a new token using the word
        let token = new Token(this.words[i][j]);
        // Add the token to the tokens array if it contains a PoS tag && PoS tag is in set object
        if (token.pos && this.pos.has(token.pos)) tokens[i].push(token);
      }
    }
  }

  /**
   * The main ranking function
   * @param {String} string the text string which will be ranked
   */

  rank(string) {
    const { type } = this;
    if (typeof string !== "string") {
      throw new ValidationError("rank method argument must be of type string");
    }
    // Check which type of ranking is being performed
    if (type === "k") {
      this.createTokens(string);
    }
    // Assemble the tokens object property
  }
}

module.exports = TextRank;
