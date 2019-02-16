import { compareType, assertType } from "./utils";

class FormState {
  constructor(form) {
    assertType(form, 'form', ['element', 'string']);

    if (compareType(form, "string")) {
      form = document.querySelector(form);
      if (!form) throw new TypeError(`${form}은 존재하지 않는 element입니다.`);
    }

    this.formEl = form;
    this.elements = getElements(form);
    this.validationTypes = {};
  }

  addValidationToElement(name, validationTypes) {
    assertType(name, 'name', 'string');
    assertType(validationTypes, 'validationTypes', 'array');

    const el = this.elements.find(el => el.name === name);

    if (!el) {
      throw new TypeError(`[addValidation] ${name}은 존재하지 않는 name 속성값입니다.`);
    }

    el.validationTypes.push(...validationTypes);
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

  validate() {
    const { elements } = this;

    // result => 유효성 검사 통과하지 않은 element의 정보를 반환시켜야함.
    // 1. element의 값을 가지고 오고
    // 2. 유효성 검사하고
    // 3. 실패한 정보 반환(el, name, errorMsg, validationType)
    return elements.reduce((result, { el, name, validationTypes }) => {
      if (validationTypes.length === 0) {
        return result;
      }

      const value = el.value;
      const validatedInfo = this._getValidatedInfo(validationTypes, value);

      result.push({
        el,
        name,
        result: validatedInfo,
        isValid: validatedInfo.some(({ isValid }) => isValid),
      });

      return result;
    }, []);
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

    this.elements = this.elements.filter(
      ({ name: _name }) => _name !== name,
    );
  }

  _getInvalidInfo(type, value) {
    if (!this.validationTypes[type]) {
      console.error(`${type}에 대한 validation이 정의되지 않았습니다.`);
      return [];
    }
    return this.validationTypes[type].reduce((invalids, { checker, errorMsg }) => {
      let isValid;

      if (compareType(checker, "function")) {
        isValid = checker(value);
      } else {
        isValid = checker.test(value);
      }

      invalids.push({
        isValid,
        errorMsg,
      });

      return invalids;
    }, []);
  }

  _getValidatedInfo = (validationTypes, value) => {
    return validationTypes.reduce((validatedInfo, type) => {
      validatedInfo = validatedInfo.concat(this._getInvalidInfo(type, value));

      return validatedInfo;
    }, []);
  };
}

export default FormState;

function getElements(form) {
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
