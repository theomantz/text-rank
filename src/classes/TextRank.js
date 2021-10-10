// Class Imports

const SentenceSplitter = require("../utilities/SentenceSplitter");
const TokenNode = require("./TokenNode");

// Error Class Imports
const ValidationError = require("../errors/ValidationError");

class TextRank {
  /**
   * constructor method to create a new instance of the text rank class
   * @param {String} type Type of extraction to perform; keyword - k, sentence - s;
   * @param {[String]} PoS PoS candidate tags defaults to [N: all nouns, V: all verbs]
   * @param {Float} dampingCoeff the dampening coefficient, defaults to 0.85
   * @param {Float} minDiff the convergence threshold defaults to 0.00001
   * @param {Integer} steps the number of iteration steps defaults to 30
   * @param {Integer} nodeWeight
   */
  constructor(settings) {
    // Check if we are passed no object
    if (!settings) {
      settings = {
        type: "k",
        pos: ["N", "J"],
        dampingCoeff: 0.85,
        minDiff: 0.00001,
        steps: 30,
        nodeWeight: null,
        windowSize: 2,
        simEquation: null,
      };
    } else {
      // Check for values for each param, enforce defaults if absent
      settings.type = settings.type || "k";
      settings.pos = settings.pos || ["N", "J"];
      if (settings.dampingCoeff !== 0 && !settings.dampingCoeff) {
        settings.dampingCoeff = 0.85;
      }
      if (settings.minDiff !== 0 && !settings.minDiff) {
        settings.minDiff = 0.00001;
      }
      settings.steps = settings.steps || 30;
      if (!settings.nodeWeight) {
        settings.nodeWeight = null;
      }
      if (settings.windowSize !== 0 && !settings.windowSize) {
        settings.windowSize = 2;
      }
      settings.simEquation = settings.simEquation || null;
    }
    // Deconstruct settings object for type checking before setting as
    // object property
    const {
      type,
      pos,
      dampingCoeff,
      minDiff,
      steps,
      nodeWeight,
      windowSize,
      simEquation,
    } = settings;

    this.type = this.checkType(type) ? type : "k";
    this.pos = this.normalizePos(pos);
    this.dampingCoeff = this.checkFloat(dampingCoeff) ? dampingCoeff : 0.85;
    this.minDiff = this.checkFloat(minDiff) ? minDiff : 0.00001;
    this.steps = this.checkInt(steps) ? steps : 10;
    this.nodeWeight = nodeWeight;
    this.windowSize = this.checkWindowSize(windowSize) ? windowSize : 2;
    this.sim = simEquation;
    this.sentences = null;
    this.tokens = [];
    this.words = [];
    this.graph = {
      V: new Set(),
      E: {},
      numVerts: 0,
    };
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
   *
   * @param {Integer} size user inputted window size
   * @returns {Integer} returns 2 if the user inputted size is not an integer
   * or is too large (arbitrarily chose 10)
   */
  checkWindowSize(size) {
    if (Number(size) === size && size <= 10) {
      return size;
    }
    return 5;
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
      "WP$", // This is actually a valid PoS tag, - Possessive-Wh
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
        ["NN", "NNP", "NNPS", "NNS"].forEach((i) => POS.add(i));
      } else if (candidate === "V") {
        ["VB", "VBD", "VBG", "VBN", "VBP", "VBZ"].forEach((i) => POS.add(i));
      } else if (candidate === "J") {
        ["JJ", "JJR", "JJS"].forEach((i) => POS.add(i));
      } else {
        if (candidateTags.has(candidate)) {
          POS.add(candidate);
        } else {
          throw new ValidationError(
            `${candidate} is not a valid PoS tag. Available PoS tags are listed in the README`
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

    // Iterate over the split sentences
    // Only works for keywords at the moment
    for (let i = 0; i < this.sentences.length; i++) {
      // Set the object property words array at index position i to the sentence
      // from the sentences array index position i split at whitespace which results in
      // An array of words
      this.words[i] = this.sentences[i].split(" ");
      for (let j = 0; j < this.words[i].length; j++) {
        // Trim the words of whitespace
        this.words[i][j] = this.words[i][j].trim();
        // Create a new token using the word
        let token = new TokenNode(this.words[i][j].toLowerCase());
        // Add the token to the tokens array if it contains a PoS tag && PoS tag is in set object
        if (token.pos && this.pos.has(token.pos)) this.tokens.push(token);
      }
    }
  }

  /**
   * building the keyword graph.
   *
   */

  setupKeywordGraph() {
    const { tokens, type, windowSize, graph } = this;

    // Add the tokens to the graph as verts
    tokens.forEach((t) => graph.V.add(t));

    // Add numVerts as the size of the graph.V set
    graph.numVerts = graph.V.size;

    // Check for user defined sim equation
    this.sim =
      this.simEquation != null ? this.simEquation : this.similarityEquation;

    // Set the windowSize for the iteration
    const size = type === "k" ? windowSize : graph.numVerts;

    // Begin to build graph
    // Iterate through the list of tokens
    let iIndex = 0;
    const that = this;
    graph.V.forEach((token) => {
      const Si = token;
      Si.id = iIndex;
      /* iterate over the other tokens in the graph, add an edge when it falls
       within the window */
      const negDiff = iIndex - size;
      const posDiff = iIndex + size;

      /* To limit the overall graph building function to one function
      start and end positions of the window will be determined first based on
      the type of extraction being performed. If it is keyword extraction, then
      ensure that the starting and ending positions dont fall out of bounds.
      If it is sentence extraction, set the start to 0 and the end to the end
      of the text. */
      let start = type === "k" ? (negDiff < 0 ? 0 : negDiff) : 0;
      let end =
        type === "k"
          ? posDiff > graph.numVerts
            ? graph.numVerts
            : posDiff
          : graph.numVerts;
      // Inner loop to check our window
      for (let j = start; j < end; j++) {
        const jIndex = j;

        // To avoid self edges
        if (iIndex !== jIndex) {
          const Sj = that.tokens[jIndex];

          /* // If we dont have this edge in our graph, create it

          I believe that with the pre and post properties of our TokenNode class
          We have already created edges but I'm leaving this code section here
          For reference.

          if (!graph.E[Si.word]) {
            graph.E[Si.word] = {};
          } */

          /* Check where we are in the start and end range, adding the tokens from
          the inner loop to the pre or post sets in our outer loop token depending 
          on whether they occur before or after our outer loop token */
          if (jIndex < iIndex) {
            Si.pre.add(Sj);
          } else if (jIndex > iIndex) {
            Si.post.add(Sj);
          }
        }
      }
      iIndex++;
    });
  }

  // Calculate the keyword score
  calculateKeywordScore() {
    const that = this;
    const { tokens, steps, graph, minDiff } = this;
    // create a maxDiff variable to check successive differences against
    let maxDiff = Number.POSITIVE_INFINITY;
    // Create a count variable to check against user defined max steps
    let count = 0;
    while (maxDiff > minDiff && count <= steps) {}
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
    this.createTokens(string);
    if (type === "k") {
      this.setupKeywordGraph();
      this.calculateKeywordScore();
    }
    // Assemble the tokens object property
  }
}

module.exports = TextRank;

const tr = new TextRank();
console.log(tr.rank("This is a sample string"));
