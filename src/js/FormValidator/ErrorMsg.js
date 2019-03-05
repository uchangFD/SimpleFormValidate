import { assertType } from "../utils/assertType";
import {
  setStyles, setAttributes, createElement, findElement,
} from "../utils/dom";
import sequencer from "../utils/sequencer";

const _defaultTemplate = () => {
  return sequencer.run([createElement, "span"], [setAttributes, { className: "error-msg" }]);
};

class ErrorMsg {
  constructor() {
    this.errorMsgs = [];
    this.errorMsgTemplate = _defaultTemplate();
    this.targetsToAppendErrorMsg = [];
  }

  setErrorMsgTemplate(tagName, attributes = {}, styles = {}) {
    this.errorMsgTemplate = sequencer.run(
      [createElement, tagName],
      [setAttributes, attributes],
      [setStyles, styles],
    );
  }

  setTargetToAppendErrorMsg(name, target) {
    assertType(name, "name", "string");

    const parentEl = findElement(target);
    const targetsToAppendErrorMsg = this.targetsToAppendErrorMsg;
    const hasName = targetsToAppendErrorMsg.some((info) => info.name === name);

    if (hasName) {
      for (const info of targetsToAppendErrorMsg) {
        if (info.name === name) {
          info.parent = parentEl;
          break;
        }
      }
    } else {
      targetsToAppendErrorMsg.push({
        name,
        parent: parentEl,
      });
    }
  }

  setErrorMsgs(errorMsgs) {
    assertType(errorMsgs, "errorMsg", "array");

    this.errorMsgs = errorMsgs.slice();
  }
}

export default ErrorMsg;
