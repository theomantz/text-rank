// Unit test for sentence-splitter

const SentenceSplitter = require("../../src/utilities/SentenceSplitter");

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

const complexInputString =
  "This string is a bit harder. \r \r It has some extra stuff in it \n so there's a good way to normalize; and split               ";

const complexOutput = [
  "This string is a bit harder. ",
  "\r",
  " ",
  "\r",
  " It has some extra stuff in it ",
  "\n",
  " so there's a good way to normalize; and split               ",
];

const complexOutput2 = [
  "This string is a bit harder",
  "It has some extra stuff in it",
  "so theres a good way to normalize and split",
];

describe("sentenceSplitter", () => {
  let splitter;

  beforeAll(() => {
    splitter = new SentenceSplitter();
  });

  describe("The newLine method", () => {
    describe("It should not split strings at punctuation", () => {
      test("String without newline separators", () => {
        expect(splitter.newLine(inputString)).toEqual([inputString]);
      });
    });
    describe("It should split strings at newline separators", () => {
      test("String with newline separators", () => {
        expect(splitter.newLine(complexInputString)).toEqual(complexOutput);
      });
    });
  });
  describe("The sentence method", () => {
    describe("It should split and sanitize inputs", () => {
      test("Regular input", () => {
        expect(splitter.sentences(inputString)).toEqual(outputString);
      });
      describe("A bit more difficult input", () => {
        test("Another input", () => {
          expect(splitter.sentences(complexInputString)).toEqual(
            complexOutput2
          );
        });
      });
    });
  });
});
