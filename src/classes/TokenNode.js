const Token = require("../utilities/Token");

class TokenNode extends Token {
  constructor(val) {
    super(val);
    this.pre = new Set();
    this.post = new Set();
    this.score = 1;
  }
}

module.exports = TokenNode;
