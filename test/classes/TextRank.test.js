const TextRank = require("../../src/classes/TextRank");
const ValidationError = require("../../src/errors/ValidationError");

const validTags = ["CC", "CD", "DT", "EX", "FW", "IN", "JJ", "JJR", "JJS"];
const invalidTags = ["invalid", "tags", "xs"];
const validAndInvalid = [
  "CC",
  "CD",
  "DT",
  "EX",
  "FW",
  "IN",
  "JJ",
  "JJR",
  "JJS",
  "invalid",
  "tags",
  "xs",
];

const unNormalizedTags = ["pos", "jjr", "prp$"];
const normalizedTags = new Set(["POS", "JJR", "PRP$"]);

const validRankInput = "This is a valid input of type string";
const invalidRankInput = 12345;

const inputString =
  "This is some sample text. It has a few lines. Some lines are really long... And others, are quite short. I think if we keep going we should cover all of our bases here but just in case.";

const outputString = [
  "This is some sample text",
  "It has a few lines",
  "Some lines are really long",
  "And others",
  "are quite short",
  "I think if we keep going we should cover all of our bases here but just in case",
];

describe("TextRank", () => {
  describe("Tag Error Handling", () => {
    describe("Valid Tags", () => {
      test("It should not throw an error when provided an array of valid tags", () => {
        expect(() => new TextRank({ pos: validTags })).not.toThrowError(
          ValidationError
        );
      });
    });
    describe("Invalid Tags", () => {
      test("It should throw an error when provided with an array of invalid tags", () => {
        expect(() => new TextRank({ pos: invalidTags })).toThrowError(
          ValidationError
        );
      });
    });
    describe("Valid and Invalid Tags", () => {
      test("It should throw an error when provided with an array of valid and invalid tags", () => {
        expect(() => new TextRank({ pos: validAndInvalid })).toThrowError(
          ValidationError
        );
      });
    });
  });
  describe("Tag Normalization", () => {
    describe("Normalize Tags", () => {
      test("It should return a new Set object of normalized tags", () => {
        expect(new TextRank({ pos: unNormalizedTags }).pos).toEqual(
          normalizedTags
        );
      });
    });
  });
  describe("Rank Method", () => {
    describe("Valid Input", () => {
      test("It should not throw an error when provided with a valid input", () => {
        expect(() => new TextRank({}).rank(validRankInput)).not.toThrowError(
          ValidationError
        );
      });
      test("It should throw an error when provided with an invalid input", () => {
        expect(() => new TextRank({}).rank(invalidRankInput)).toThrowError(
          ValidationError
        );
      });
    });
    describe("Valid Splitting", () => {
      test("It should properly split a string into sentences", () => {
        const tr = new TextRank({});
        tr.rank(inputString);
        expect(tr.sentences).toEqual(outputString);
      });
    });
  });
});
