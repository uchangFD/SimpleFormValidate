import assertType from "../utils/assertType";
import getType from "../utils/getType";

class ValidationNode {
  state = {
    isAsync: false,
    matcher: undefined,
    errorMsg: "",
    name: "",
  };

  constructor(info) {
    info && assertType(info, "object") && Object.assign(state, info);
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
