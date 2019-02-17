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

    if (compareType(target, "string")) target = document.querySelector(target);

    if (!target) {
      throw new TypeError(`target 을 찾을 수 없습니다.`);
    }

    this.targets = this.targets.filter(t => name !== t.name);
    this.targets.push({ name, targetEl: target });
  }

  makeErrorMsg (validatedInfos) {
    const errorMsgTemplate = this.template;

    this.messages = validatedInfos
      .filter(({ isValid }) => !isValid)
      .map(({ el, name, result }) => {
        const cloneErrorMsgTemplate = errorMsgTemplate.cloneNode(true);
        const invalidInfos = result.filter(r => !r.isValid);
        const target = this._findTargetToAppendErrorMsg(name);

        cloneErrorMsgTemplate.innerText = invalidInfos[0].errorMsg;

        return ({
          target: target.length === 0 ? el.parentNode : target[0],
          errorMsgEl: cloneErrorMsgTemplate,
        });
      });

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
