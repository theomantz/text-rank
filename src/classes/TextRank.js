// Class Imports
const Token = require("./Token");
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
    nodeWeight = null
  ) {
    this.pos = this.normalizePos(PoS);
  }

  /**
   *
   * @param {[String]} pos candidate PoS tags
   * @returns {Set({String})} a Set object of user chosen PoS Tags
   */

  normalizePos(pos) {
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

  rank(string) {
    if (typeof string !== "string") {
      throw new ValidationError("rank method argument must be of type string");
    }
    this.string = string;
    this.sentences = SentenceSplitter.sentences(string);
  }
}

module.exports = TextRank;
