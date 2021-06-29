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

describe("TextRank", () => {
  describe("Tag Error Handling", () => {
    describe("Valid Tags", () => {
      test("It should not throw an error when provided an array of valid tags", () => {
        expect(() => new TextRank(validTags)).not.toThrowError(ValidationError);
      });
    });
    describe("Invalid Tags", () => {
      test("It should throw an error when provided with an array of invalid tags", () => {
        expect(() => new TextRank(invalidTags)).toThrowError(ValidationError);
      });
    });
    describe("Valid and Invalid Tags", () => {
      test("It should throw an error when provided with an array of valid and invalid tags", () => {
        expect(() => new TextRank(validAndInvalid)).toThrowError(
          ValidationError
        );
      });
    });
  });
  describe("Tag Normalization", () => {
    describe("Normalize Tags", () => {
      test("It should return a new Set object of normalized tags", () => {
        expect(new TextRank(unNormalizedTags).pos).toEqual(normalizedTags);
      });
    });
  });
});
