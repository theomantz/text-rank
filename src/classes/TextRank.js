// Class Imports

const SentenceSplitter = require("../utilities/SentenceSplitter");
// import Lexer from "./Lexer";

// Error Class Imports
const ValidationError = require("../errors/ValidationError");

class TextRank {
  /**
   *
   * @param {[String]} PoS PoS candidate tags defaults to [all nouns, all verbs]
   * @param {Float} dampingCoeff the dampening coefficient, defaults to 0.85
   * @param {Float} minDiff the convergence threshold defaults to 0.00001
   * @param {Integer} steps the number of iteration steps defaults to 10
   * @param {Integer} nodeWeight
   */
  constructor(
    PoS = ["N", "V"],
    dampingCoeff = 0.85,
    minDiff = 0.00001,
    steps = 10,
    nodeWeight = null,
    string = null
  ) {
    this.pos = this.normalizePos(PoS);
    this.dampingCoeff = dampingCoeff;
    this.minDiff = minDiff;
    this.steps = steps;
    this.nodeWeight = nodeWeight;
    this.string = string;
    this.sentences = null;
    this.words = null;
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

  sentences(str) {
    return SentenceSplitter.sentences(str);
  }

  /**
   * The main ranking function
   * @param {String} string the text string which will be ranked
   */

  rank(string) {
    if (typeof string !== "string") {
      throw new ValidationError("rank method argument must be of type string");
    }

    this.string = string;
    this.sentences = sentences(string);
    this.words = new Array(this.sentences.length);

    for (let i = 0; i < this.sentences.length; i++) {
      // this.words[i] = z
    }
  }
}

module.exports = TextRank;
