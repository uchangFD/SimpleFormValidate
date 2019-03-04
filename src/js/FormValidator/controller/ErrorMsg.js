import ErrorMsg from "../state/ErrorMsg";

import { assertType } from "../../utils/assertType";
import {
  setStyles, setAttributes, createElement, findElement, domSequence,
} from "../../utils/dom";

const getErrorMsgInstance = () => new ErrorMsg();

const setErrorMsgTemplate = (tagName, attributes = {}, styles = {}) => {
  const createDomSequence = domSequence({ tagName, attributes, styles });

  this.errorMsgTemplate = createDomSequence(createElement, setStyles, setAttributes);
};

const setTargetToAppendErrorMsg = (name, target) => {
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
};

const setErrorMsgs = (errorMsgs) => {
  assertType(errorMsgs, "errorMsg", "array");

  this.errorMsgs = errorMsgs.slice();
};

const _defaultTemplate = () => {
  return domSequence({ tagName: "span", attributes: { className: "error-msg" } })(
    createElement,
    setAttributes,
  );
};
