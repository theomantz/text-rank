const Token = require("../utilities/Token");

class TokenNode extends Token {
  constructor(val) {
    super(val);
    this.pre = new Set();
    this.post = new Set();
    this.score = Math.random() * 10 + 1;
  }
}

module.exports = TokenNode;
