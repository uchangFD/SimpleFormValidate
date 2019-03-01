import { assertType } from "../utils/assertType";
import { setStyles, setAttributes, createElement, findElement, domSequence } from "../utils/dom";

class ErrorMsgState {
  constructor() {
    this.errorMsgs = [];
    this.errorMsgTemplate = this._defaultTemplate();
    this.targetsToAppendErrorMsg = [];
  }

  setErrorMsgTemplate(tagName, attributes = {}, styles = {}) {
    const createDomSequence = domSequence({ tagName, attributes, styles });

    this.errorMsgTemplate = createDomSequence(createElement, setStyles, setAttributes);
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

  _defaultTemplate = () => {
    return domSequence({ tagName: "span", attributes: { className: "error-msg" } })(
      createElement,
      setAttributes,
    );
  };
  // makeErrorMsg는 validate검사 결과에 대한 에러메시지를 관리할 필요가 없다.
}

export default ErrorMsgState;
