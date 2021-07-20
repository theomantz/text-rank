const Token = require("../../src/utilities/Token");

const words = ["feeling", "plant", "mobster", "Charles Bukowski"];

describe("Token", () => {
  let tokens = [];
  beforeAll(() => {
    for (let i = 0; i < words.length; i++) {
      tokens[i] = new Token(words[i]);
    }
  });

  describe("New Token creation", () => {
    describe("It should properly assign PoS tags to words which exist in the lexicon", () => {
      test("feeling", () => {
        expect(tokens[0].word).toEqual(words[0]);
        expect(tokens[0].pos).toEqual("NN");
      });
      test("plant", () => {
        expect(tokens[1].word).toEqual(words[1]);
        expect(tokens[1].pos).toEqual("NN");
      });
      test("mobster", () => {
        expect(tokens[2].word).toEqual(words[2]);
        expect(tokens[2].pos).toEqual("NN");
      });
    });
    describe("It should not assign PoS tags to words which do not exist in the lexicon", () => {
      test("Charles Bukowski", () => {
        expect(tokens[3].word).toEqual(words[3]);
        expect(tokens[3].pos).toBe(null);
      });
    });
  });
});
