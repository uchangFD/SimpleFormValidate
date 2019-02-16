import { compareType, assertType } from "./utils";

class FormState {
  constructor(form) {
    assertType(form, 'form', ['element', 'string']);

    if (compareType(form, "string")) {
      form = document.querySelector(form);
      if (!form) throw new TypeError(`${form}은 존재하지 않는 element입니다.`);
    }

    this.formEl = form;
    this.infos = getInfos(form);
    this.validationTypes = {};
  }

  addValidationToElement(name, validationTypes) {
    assertType(name, 'name', 'string');
    assertType(validationTypes, 'validationTypes', 'array');

    const info = this.infos.find(info => info.name === name);

    if (!info) {
      throw new TypeError(`[addValidation] ${name}은 존재하지 않는 name 속성값입니다.`);
    }

    info.validationTypes.push(...validationTypes);
  }

  addValidationTypes(type, checker, errorMsg) {
    assertType(type, 'type', 'string');
    assertType(checker, 'checker', ['function', 'regexp']);
    assertType(errorMsg, 'errorMsg', 'string');

    if (!this.validationTypes[type]) {
      this.validationTypes[type] = [];
    }

    this.validationTypes[type].push({
      checker,
      errorMsg,
    });
  }

  // result => 유효성 검사 통과하지 않은 element의 정보를 반환시켜야함.
  // 1. element의 값을 가지고 오고
  // 2. 유효성 검사하고
  // 3. 실패한 정보 반환(el, name, errorMsg, validationType)
  validate() {
    return this.infos
      .filter(info => info.validationTypes.length > 0)
      .map(({ el, name, validationTypes }) => {
        const validatedInfo = this._getValidatedInfo(validationTypes, el.value);
        return {
          el,
          name,
          result: validatedInfo,
          isValid: validatedInfo.some(({ isValid }) => isValid),
        };
      });
  }

  removeValidationTypes (type) {
    assertType(type, 'type', 'string');

    if (!this.validationTypes[type]) {
      console.error(`[removeValidation] ${type}은 정의되지 않은 validation type입니다.`);
      return false;
    }

    this.validationTypes[type] = undefined;
  }

  removeValidationToElement(name) {
    assertType(name, 'name', 'string');

    this.infos = this.infos.filter(
      ({ name: _name }) => _name !== name,
    );
  }

  _getInvalidInfo=(type, value) => {
    return (this.validationTypes[type] || []).map(({ checker, errorMsg }) => {
      return {
        isValid: compareType(checker, "function") ? checker(value) : checker.test(value),
        errorMsg,
      };
    });
  }

  _getValidatedInfo (validationTypes, value) {
    return validationTypes.reduce((validatedInfo, type) => {
      validatedInfo = validatedInfo.concat(this._getInvalidInfo(type, value));
      return validatedInfo;
    }, []);
  }
}

export default FormState;

function getInfos(form) {
  return Array.from(form)
    .map(el => {
      const name = el.name;
      const nodeName = el.nodeName;

      return {
        name,
        nodeName,
        el,
        validationTypes: [],
      };
    });
}
