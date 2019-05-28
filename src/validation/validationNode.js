import assertType from "../utils/assertType";
import getType from "../utils/getType";

// TODO: Hook을 적용해야 하는데 어떻게하지?😕
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
  /**
   * @description set errorMsg
   * @param {String} - name
   */
  setErrorMsg(msg) {
    assertType(msg, "string");

    this.state.errorMsg = msg;
  }
  /**
   * @description get errorMsg
   * @returns errorMsg
   */
  getErrorMsg() {
    return this.state.getErrorMsg;
  }

  /**
   * @description set state
   * @param {Object} - info
   */
  setState(info) {
    if (!info) {
      return;
    }

    assertType(info, "object");

    Object.assign(this.state, info);
  }
}

export default ValidationNode;
