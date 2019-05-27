import assertType from "../utils/assertType";
import getType from "../utils/getType";

class ValidationNode {
  constructor(info) {
    // info validation

    this.isAsync = false;
    this.matcher;
    this.errorMsg;
    this.name;
  }

  checkValue(value) {
    // return result[Object];
  }
  setMatcher(matcher) {
    assertType(matcher, ["function", "regexp"]);
    // void
  }
  getMatcher() {
    // return matcher
  }
  setName(name) {
    assertType(name, "string");
    // void
  }
  getName() {
    // return name
  }
}

export default ValidationNode;
