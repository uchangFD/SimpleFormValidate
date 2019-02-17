import { compareType, assertType } from "./utils";

class FormErrorMsg {
  constructor() {
    this.template = Object.assign(document.createElement('span'), { className: 'error-msg' });
    this.messages = [];
    this.targets = [];
  }

  setErrorMsgTemplate(tagName, attrs, style) {
    assertType(tagName, 'tagName', 'string');
    this.template = Object.assign(document.createElement(tagName), { style, ...attrs });
  }

  setTargetToAppendErrorMsg (name, target) {
    assertType(name, 'name', 'string');
    assertType(target, 'target', ['string', 'element']);

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

    this.targets = this.targets.filter(
      ({ name: _name }) => name !== _name,
    );
    this.targets.push({
      name,
      targetEl,
    });
  }

  makeErrorMsg (validatedInfos) {
    const errorMsgTemplate = this.template;

    this.messages = validatedInfos.reduce((_errorMsgs, {
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
    this.messages.forEach(({ target, errorMsgEl }) => {
      target.appendChild(errorMsgEl);
      // errorMsgEl.parentNode.appendChild(errorMsgEl);
    });

    return this;
  }

  removeErrorMsgAll () {
    this.messages.forEach(({ target, errorMsgEl }) => {
      target.removeChild(errorMsgEl);
    });

    return this;
  }

  _findTargetToAppendErrorMsg (name) {
    return this.targets
      .filter(({ name: _name }) => _name === name)
      .map(({ targetEl }) => targetEl);
  }
}

export default FormErrorMsg;
