const Lexicon = require("../../src/utilities/Lexicon");
const realWord = "helpfully";
const otherRealWord = "Looking";
const falseWord = "Theo M";

describe("Lexicon", () => {
  describe("The has method", () => {
    describe("It should return true when passed a word in the lexicon", () => {
      test("Word in the lexicon", () => {
        expect(Lexicon.has(realWord)).toBe(true);
      });
    });
    describe("It should return false when passed a word that is not in the lexicon", () => {
      test("Word not in the lexicon", () => {
        expect(Lexicon.has(falseWord)).toBe(false);
      });
    });
  });
  describe("The getTags method", () => {
    describe("It should return the appropriate tags when passed a word in the lexicon", () => {
      test("Word in lexicon", () => {
        expect(Lexicon.getTags(realWord)).toEqual(["RB"]);
        expect(Lexicon.getTags(otherRealWord)).toEqual(["VBG", "NNP"]);
      });
    });
    describe("It should return false when the word is not in the lexion", () => {
      test("Word not in lexicon", () => {
        expect(Lexicon.getTags(falseWord)).toBe(false);
      });
    });
  });
});
