/**
 * Porter Stemmer algorithm in JavaScript.
 * The original paper can be found here: https://tartarus.org/martin/PorterStemmer/def.txt
 * The ES6 class syntax in this file is largely just refactored and updated code from this source: https://tartarus.org/martin/PorterStemmer/
 */

const step2List = {
  ational: "ate",
  tional: "tion",
  enci: "ence",
  anci: "ance",
  izer: "ize",
  bli: "ble",
  alli: "al",
  entli: "ent",
  eli: "e",
  ousli: "ous",
  ization: "ize",
  ation: "ate",
  ator: "ate",
  alism: "al",
  iveness: "ive",
  fulness: "ful",
  ousness: "ous",
  aliti: "al",
  iviti: "ive",
  biliti: "ble",
  logi: "log",
};

const step3List = {
  icate: "ic",
  ative: "",
  alize: "al",
  iciti: "ic",
  ical: "ic",
  ful: "",
  ness: "",
};

// RegExp Tests:
// consonants
const c = "[^aeiou]";
// vowels
const v = "[aeiouy]";
// a sequence of consonants
const C = c + "[^aeiouy]*";
// Vowel sequence
const V = v + "[aeiou]*";
// Categorization Tests:
const mgr0 = "^(" + C + ")?" + V + C; // [C]VC... is m>0
const meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$"; // [C]VC[V] is m=1
const mgr1 = "^(" + C + ")?" + V + C + V + C; // [C]VCVC... is m>1
const s_v = "^(" + C + ")?" + v; // vowel in stem

class PorterStemmer {
  /**
   *
   * @param {string} w - a single word string
   * @returns string
   */

  step1a(w) {
    const re = /^(.+?)(ss|i)es$/;
    const re2 = /^(.+?)([^s])s$/;
    if (re.test(w)) {
      w = w.replace(re, "$1$2");
    } else if (re2.test(w)) {
      w = w.replace(re2, "$1$2");
    }
    return w;
  }

  step1b(w) {
    let re = /^(.+?)eed$/;
    let re2 = /^(.+?)(ed|ing)$/;
    if (re.test(w)) {
      let rootArr = re.exec(w);
      re = new RegExp(mgr0);
      if (re.test(rootArr[1])) {
        re = /.$/;
        w = w.replace(re, "");
      }
    } else if (re2.test(w)) {
      let rootArr = re2.exec(w);
      let stem = rootArr[1];
      re2 = new RegExp(s_v);
      if (re2.test(stem)) {
        w = stem;
        re2 = /(at|bl|iz)$/;
        let re3 = new RegExp("([^aeiouylsz])\\1$");
        let re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
        if (re2.test(w)) {
          w = w + "e";
        } else if (re3.test(w)) {
          re = /.$/;
          w = w.replace(re, "");
        } else if (re4.test(w)) {
          w = w + "e";
        }
      }
    }
    return w;
  }

  step1c(w) {
    let re = /^(.+?)y$/;
    if (re.test(w)) {
      let rootArr = re.exec(w);
      let stem = rootArr[1];
      re = new RegExp(s_v);
      if (re.test(stem)) {
        w = stem + "i";
      }
    }
    return w;
  }

  step2(w) {
    let re =
      /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
    if (re.test(w)) {
      let rootArr = re.exec(w);
      let stem = rootArr[1];
      let suffix = rootArr[2];
      re = new RegExp(mgr0);
      if (re.test(stem)) {
        // console.log(suffix);
        w = stem + step2List[suffix];
      }
    }
    return w;
  }

  step3(w) {
    let re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
    if (re.test(w)) {
      let rootArr = re.exec(w);
      let stem = rootArr[1];
      let suffix = rootArr[2];
      re = new RegExp(mgr0);
      if (re.test(stem)) {
        w = stem + step3List[suffix];
      }
    }
    return w;
  }

  step4(w) {
    let re =
      /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
    let re2 = /^(.+?)(s|t)(ion)$/;
    if (re.test(w)) {
      let rootArr = re.exec(w);
      let stem = rootArr[1];
      re = new RegExp(mgr1);
      if (re.test(stem)) {
        w = stem;
      }
    } else if (re2.test(w)) {
      let rootArr = re2.exec(w);
      let stem = rootArr[1] + rootArr[2];
      re2 = new RegExp(mgr1);
      if (re2.test(stem)) {
        w = stem;
      }
    }
    return w;
  }

  step5a(w) {
    let re = /^(.+?)e$/;
    if (re.test(w)) {
      let rootArr = re.exec(w);
      let stem = rootArr[1];
      re = new RegExp(mgr1);
      let re2 = new RegExp(meq1);
      let re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
      if (re.test(stem) || (re2.test(stem) && !re3.test(stem))) {
        w = stem;
      }
    }
    return w;
  }

  step5b(w) {
    let re = /ll$/;
    let re2 = new RegExp(mgr1);
    if (re.test(w) && re2.test(w)) {
      re = /.$/;
      w = w.replace(re, "");
    }
    return w;
  }

  stem(w) {
    const {
      step1a,
      step1b,
      step1c,
      step2,
      step3,
      step4,
      step5a,
      step5,
      step5b,
    } = this;
    if (w.length < 3) return w;
    const firstChar = w.substring(0, 1);
    if (firstChar === "y") {
      w = firstChar.toUpperCase() + w.substring(1);
    }
    w = step5b(step5a(step4(step3(step2(step1c(step1b(step1a(w))))))));
    if (firstChar === "Y") {
      w = firstChar.toLowerCase() + w.substring(1);
    }
    return w;
  }
}

module.exports = new PorterStemmer();
