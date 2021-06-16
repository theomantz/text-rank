// Unit test for sentence-splitter

const SentenceSplitter = require("../../src/preprocessing/SentenceSplitter");

const inputString =
  "This is some sample text. It has a few lines. Some lines are really long... And others, are quite short. I think if we keep going we should cover all of our bases here but just in case.";

const splitInput = [
  "This is some simple text",
  "It has a few lines",
  "Some lines are really long",
  "And others, are quite short",
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

describe("sentenceSplitter", () => {
  let splitter;
  beforeAll(() => {
    splitter = new SentenceSplitter();
    return splitter;
  });
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
