// Unit tests for text validation
const textValidation = require("../../src/preprocessing/textValidation");
const correct = "This is a correct text string.";
const invalidType = new Array(5);
const invalidLength = "";

describe("textValidation", () => {
  // Returns true for valid type and length
  test("Returns true for valid type and length", () => {
    expect(textValidation(correct)).toBe(true);
  });
  // Returns false for invalid type
  test("Returns false for invalid type", () => {
    expect(textValidation(invalidType)).toBe(false);
  });
  // Returns false for invalid length
  test("Returns false for invalid length", () => {
    expect(textValidation(invalidLength)).toBe(false);
  });
});
