const TokenNode = require("../../src/classes/TokenNode");

const words = ["feeling", "plant", "mobster", "Charles Bukowski"];

describe("TokenNode", () => {
  let tokenNodes = [];
  beforeAll(() => {
    for (let i = 0; i < words.length; i++) {
      tokenNodes[i] = new TokenNode(words[i]);
    }
  });

  beforeEach(() => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.1234567);
  });

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  describe("New Token creation", () => {
    describe("It should properly assign PoS tags to words which exist in the lexicon", () => {
      test("feeling", () => {
        expect(tokenNodes[0].word).toEqual(words[0]);
        expect(tokenNodes[0].pos).toEqual("NN");
      });
      test("plant", () => {
        expect(tokenNodes[1].word).toEqual(words[1]);
        expect(tokenNodes[1].pos).toEqual("NN");
      });
      test("mobster", () => {
        expect(tokenNodes[2].word).toEqual(words[2]);
        expect(tokenNodes[2].pos).toEqual("NN");
      });
    });
    describe("It should not assign PoS tags to words which do not exist in the lexicon", () => {
      test("Charles Bukowski", () => {
        expect(tokenNodes[3].word).toEqual(words[3]);
        expect(tokenNodes[3].pos).toBe(null);
      });
    });
    describe("It should properly assign random values to each TokenNode", () => {
      tokenNodes.forEach((v) => {
        test(`${v.word} to have a random score`, () => {
          expect(v.score).toEqual(0.1234567);
        });
      });
    });
  });
});
