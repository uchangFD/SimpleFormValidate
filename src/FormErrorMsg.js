import { compareType, assertType } from "./utils";

class FormErrorMsg {
  constructor() {
    this.template = Object.assign(document.createElement('span'), { className: 'error-msg' });
    this.messages = [];
    this.targets = {};
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

    this.targets[name] = target;
  }

  makeErrorMsg ({ el, name, result }) {
    const target = this.targets[name] || el.parentNode;
    const errorMsgEl = this.template.cloneNode(true);
    errorMsgEl.innerText = result.find(r => !r.isValid).errorMsg;

    return ({ target, errorMsgEl });
  }

  display(infos) {
    this.messages.forEach(({ target, errorMsgEl }) => target.removeChild(errorMsgEl));

    this.messages = infos
      .filter(info => !info.isValid)
      .map(info => this.makeErrorMsg(info));

    this.messages.forEach(({ target, errorMsgEl }) => target.appendChild(errorMsgEl));
  }
}

export default FormErrorMsg;
