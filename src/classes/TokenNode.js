const Token = require("../utilities/Token");

class TokenNode extends Token {
  constructor(val) {
    super(val);
    this.pre = new Set();
    this.post = new Set();
    this.id = null;
    this.tokenCount = this.countTokens();
    this.score = Math.random() * 10 + 1;
  }

  countTokens() {
    return this.pre.size + this.post.size;
  }
}

module.exports = TokenNode;
