import { compareType, getValidatedMethod } from "../utils/utils";

class FormErrorMsg {
  errorMsgs = [];
  errorMsgTemplate;
  targetsToAppendErrorMsg = [];

  constructor() {
    this.errorMsgTemplate = this._defaultTemplate();
  }

  setErrorMsgTemplate = getValidatedMethod(["string"], "all", "all")(function(
    tagName,
    attributes,
    styles,
  ) {
    const element = this._createElement(tagName);

    this._setAttributes(element, attributes);
    this._setStyles(element, styles);

    this.errorMsgTemplate = element;
  });

  setTargetToAppendErrorMsg = getValidatedMethod(["string"], ["string", "element"])(function(
    name,
    target,
  ) {
    // if (!this.elementsForValidation.some(({ name: _name }) => _name === name)) {
    //   console.error(`addTarget으로 추가된 ${name}이 없습니다.`);
    //   return false;
    // }

    let targetEl;

    if (compareType(target, "element")) {
      targetEl = target;
    } else {
      targetEl = target.length !== 0 ? document.querySelector(target) : undefined;
    }

    if (!targetEl) {
      console.error(`${target} 을 찾을 수 없습니다.`);
      return this;
    }

    this.targetsToAppendErrorMsg = this.targetsToAppendErrorMsg.filter(
      ({ name: _name }) => name !== _name,
    );
    this.targetsToAppendErrorMsg.push({
      name,
      targetEl,
    });
  });

  makeErrorMsg (validatedInfos) {
    const errorMsgTemplate = this.errorMsgTemplate;

    this.errorMsgs = validatedInfos.reduce((_errorMsgs, {
      isValid, el, name, result,
    }) => {
      if (isValid || result.length === 0) {
        return _errorMsgs;
      }

      const cloneErrorMsgTemplate = errorMsgTemplate.cloneNode(true);
      const invalidInfos = result.filter(({ isValid: _isValid }) => !_isValid);
      const target = this._findTargetToAppendErrorMsg(name);

      cloneErrorMsgTemplate.innerText = invalidInfos[0].errorMsg;

      _errorMsgs.push({
        target: target.length === 0 ? el.parentNode : target[0],
        errorMsgEl: cloneErrorMsgTemplate,
      });

      return _errorMsgs;
    }, []);

    return this;
  }

  appendErrorMsg () {
    this.errorMsgs.forEach(({ target, errorMsgEl }) => {
      target.appendChild(errorMsgEl);
      // errorMsgEl.parentNode.appendChild(errorMsgEl);
    });

    return this;
  }

  removeErrorMsgAll () {
    this.errorMsgs.forEach(({ target, errorMsgEl }) => {
      target.removeChild(errorMsgEl);
    });

    return this;
  }

  _findTargetToAppendErrorMsg (name) {
    return this.targetsToAppendErrorMsg
      .filter(({ name: _name }) => _name === name)
      .map(({ targetEl }) => targetEl);
  }

  _createElement = (tagName) => document.createElement(tagName);

  _setAttributes (el, attributes) {
    for (let prop in attributes) {
      if (attributes.hasOwnProperty(prop)) {
        el[prop] = attributes[prop];
      }
    }
  }

  _setStyles (el, styles) {
    for (let prop in styles) {
      if (styles.hasOwnProperty(prop)) {
        el.styles[prop] = styles[prop];
      }
    }
  }

  _defaultTemplate () {
    const el = document.createElement("span");

    el.setAttribute("class", "error-msg");

    return el;
  }
}

export default FormErrorMsg;
