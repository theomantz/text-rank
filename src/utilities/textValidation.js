// Simple validator to check for correct object type and a positive length of input
// string

function textValidation(str) {
  if (typeof str === "string" && str.length > 3) {
    return true;
  }
  return false;
}

module.exports = textValidation;
