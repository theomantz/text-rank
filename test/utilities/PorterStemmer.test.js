// Testing the PorterStemmer object methods.
const PorterStemmer = require("../../src/utilities/PorterStemmer");

/* beforeAll(() => {
  const porterStemmer = new PorterStemmer();
}); */

describe("PorterStemmer", () => {
  describe("step1a", () => {
    test("It should not modify any word that is a stem", () => {
      expect(PorterStemmer.step1a("caress")).toEqual("caress");
    });

    test("It should remove the suffix correctly", () => {
      expect(PorterStemmer.step1a("caresses")).toEqual("caress");
      expect(PorterStemmer.step1a("ponies")).toEqual("poni");
      expect(PorterStemmer.step1a("ties")).toEqual("ti");
      expect(PorterStemmer.step1a("cats")).toEqual("cat");
    });
  });

  describe("step1b", () => {
    test("It should not modify any word that is a stem", () => {
      expect(PorterStemmer.step1b("bled")).toEqual("bled");
      expect(PorterStemmer.step1b("sing")).toEqual("sing");
      expect(PorterStemmer.step1b("feed")).toEqual("feed");
    });

    test("It should remove the suffix correctly", () => {
      expect(PorterStemmer.step1b("agreed")).toEqual("agree");
      expect(PorterStemmer.step1b("plastered")).toEqual("plaster");
      expect(PorterStemmer.step1b("motoring")).toEqual("motor");
    });

    test("It should properly chain rules", () => {
      expect(PorterStemmer.step1b("conflated")).toEqual("conflate");
      expect(PorterStemmer.step1b("troubled")).toEqual("trouble");
      expect(PorterStemmer.step1b("sized")).toEqual("size");
      expect(PorterStemmer.step1b("hopping")).toEqual("hop");
      expect(PorterStemmer.step1b("tanned")).toEqual("tan");
      expect(PorterStemmer.step1b("falling")).toEqual("fall");
      expect(PorterStemmer.step1b("hissing")).toEqual("hiss");
      expect(PorterStemmer.step1b("fizzed")).toEqual("fizz");
      expect(PorterStemmer.step1b("failing")).toEqual("fail");
      expect(PorterStemmer.step1b("filing")).toEqual("file");
    });
  });

  describe("step1c", () => {
    test("It should remove the suffix correctly", () => {
      expect(PorterStemmer.step1c("happy")).toEqual("happi");
    });
    test("It should not modify any word that is a stem", () => {
      expect(PorterStemmer.step1c("sky")).toEqual("sky");
    });
  });

  describe("step2", () => {
    test("ATIONAL -> ATE", () => {
      expect(PorterStemmer.step2("relational")).toEqual("relate");
      expect(PorterStemmer.step2("conditional")).toEqual("condition");
      expect(PorterStemmer.step2("rational")).toEqual("rational");
    });
    test("TIONAL -> TION", () => {
      expect(PorterStemmer.step2("valenci")).toEqual("valence");
    });
    test("ANCI -> ANCE", () => {
      expect(PorterStemmer.step2("hesitanci")).toEqual("hesitance");
    });
    test("IZER -> IZE", () => {
      expect(PorterStemmer.step2("digitizer")).toEqual("digitize");
    });
    test("IZATION -> IZE", () => {
      expect(PorterStemmer.step2("digitalization")).toEqual("digitalize");
    });
    test("FULNESS -> FUL", () => {
      expect(PorterStemmer.step2("hopefulness")).toEqual("hopeful");
    });
  });

  describe("step3", () => {
    test("ICATE -> IC", () => {
      expect(PorterStemmer.step3("triplicate")).toEqual("triplic");
    });
    test("ICAL -> IC", () => {
      expect(PorterStemmer.step3("electrical")).toEqual("electric");
    });
  });

  describe("step4", () => {
    test("AL ->", () => {
      expect(PorterStemmer.step4("revival")).toEqual("reviv");
    });
    test("MENT ->", () => {
      expect(PorterStemmer.step4("adjustment")).toEqual("adjust");
    });
  });

  describe("step5a", () => {
    test("E ->", () => {
      expect(PorterStemmer.step5a("probate")).toEqual("probat");
    });
    test("E ->", () => {
      expect(PorterStemmer.step5a("cease")).toEqual("ceas");
    });
  });

  describe("step5b", () => {
    test("E ->", () => {
      expect(PorterStemmer.step5b("controll")).toEqual("control");
    });
    test("E ->", () => {
      expect(PorterStemmer.step5b("roll")).toEqual("roll");
    });
  });

  describe("stem", () => {
    test("it should remove complex suffixes", () => {
      expect(PorterStemmer.stem("generalizations")).toEqual("gener");
      expect(PorterStemmer.stem("oscillators")).toEqual("oscil");
    });
  });
});
