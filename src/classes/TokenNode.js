const Token = require("../utilities/Token");

class TokenNode extends Token {
  constructor(val) {
    this.val = val;
    this.children = new Set();
    this.score = 1;
  }
}

module.exports = TokenNode;
