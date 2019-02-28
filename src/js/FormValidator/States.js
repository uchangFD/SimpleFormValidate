import { assertType } from "../utils/assertType";
import {
  setStyles, setAttributes, createElement, findElement, domSequence,
} from "../utils/dom";

class State {
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
  _defaultTemplate = () => {
    return domSequence({ tagName: "span", attributes: { className: "error-msg" } })(
      createElement,
      setAttributes,
    );
  };
  // makeErrorMsg = (validatedInfos) => {
  //   assertType(validatedInfos, "validatedInfos", "array");

  //   const errorMsgTemplate = this.errorMsgTemplate;

  //   if (typeof errorMsgTemplate === "undefined") {
  //     throw Error(`Not setting errorMsgTemplate`);
  //   }

  //   this.errorMsgs = validatedInfos.reduce((_errorMsgs, {
  //     isValid, el, name, result,
  //   }) => {
  //     if (isValid || result.length === 0) {
  //       return _errorMsgs;
  //     }

  //     const cloneErrorMsgTemplate = errorMsgTemplate.cloneNode(true);
  //     const invalidInfos = result.filter(({ isValid: _isValid }) => !_isValid);
  //     const target = this._findTargetToAppendErrorMsg(name);

  //     cloneErrorMsgTemplate.innerText = invalidInfos[0].errorMsg;

  //     _errorMsgs.push({
  //       target: target.length === 0 ? el.parentNode : target[0],
  //       errorMsgEl: cloneErrorMsgTemplate,
  //     });

  //     return _errorMsgs;
  //   }, []);

  //   return this;
  // };
}

export default State;
