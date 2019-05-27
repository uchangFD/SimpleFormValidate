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

  /**
   * @description validate value with matcher
   * @param {any} - value
   */
  validate(value) {
    const { matcher, errorMsg } = this.state;
    let validatedResult;

    if (getType(matcher) === "function") {
      validatedResult = matcher(value);
    } else {
      validatedResult = matcher.test(value);
    }

    return {
      result: validatedResult,
      errorMsg,
    };
  }
  /**
   * @description set matcher
   * @param {Function | Regexp} - matcher
   */
  setMatcher(matcher) {
    assertType(matcher, ["function", "regexp"]);

    this.state.matcher = matcher;
  }
  /**
   * @description get matcher
   * @returns matcher
   */
  getMatcher() {
    return this.state.matcher;
  }
  /**
   * @description set Name
   * @param {String} - name
   */
  setName(name) {
    assertType(name, "string");

    this.state.name = name;
  }
  /**
   * @description get matcher
   * @returns name
   */
  getName() {
    return this.state.name;
  }
}

export default ValidationNode;
