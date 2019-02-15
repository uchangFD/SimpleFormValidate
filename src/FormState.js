import { compareType, getValidatedMethod } from "./utils";

class FormState {
  constructor(form) {
    if (!compareType(form, "element") && !compareType(form, "string")) {
      throw new TypeError(`${form}은 string or element 타입이 아닙니다.`);
    }

    if (compareType(form, "string")) {
      form = document.querySelector(form);
      if (!form) throw new TypeError(`${form}은 존재하지 않는 element입니다.`);
    }

    this.formEl = form;
    this.elementsForValidation = null;
    this.validationTypes = {};

    this.init();
  }

  init () {
    const self = this;

    self.elementsForValidation = Array.from(self.formEl.querySelectorAll("[name]")).map(
      (element) => {
        // 수집할 정보들 [name, nodeName, element, validationTypes]
        const name = element.name;
        const nodeName = element.nodeName;

        return {
          name,
          nodeName,
          el: element,
          validationTypes: [],
        };
      },
    );
  }

  addValidationToElement = getValidatedMethod(["string"], ["string"])(function(
    name,
    validationTypes,
  ) {
    // params [name, validation[ Array['String'] ]]

    const { elementsForValidation } = this;
    const [elementInfo] = elementsForValidation.filter(({ name: _name }) => _name === name);

    if (!elementInfo) {
      console.error(`[addValidation] ${name}은 존재하지 않는 name 속성값입니다.`);
      return this;
    }

    elementInfo.validationTypes = elementInfo.validationTypes.concat(validationTypes);
  });

  addValidationTypes = getValidatedMethod(["string"], ["function", "regexp"], ["string"])(function(
    type,
    checker,
    errorMsg,
  ) {
    if (!this.validationTypes[type]) {
      this.validationTypes[type] = [];
    }

    this.validationTypes[type].push({
      checker,
      errorMsg,
    });
  });

  validate = function() {
    const { elementsForValidation } = this;

    // result => 유효성 검사 통과하지 않은 element의 정보를 반환시켜야함.
    // 1. element의 값을 가지고 오고
    // 2. 유효성 검사하고
    // 3. 실패한 정보 반환(el, name, errorMsg, validationType)
    return elementsForValidation.reduce((result, { el, name, validationTypes }) => {
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
  };

  removeValidationTypes = getValidatedMethod(["string"])(function(type) {
    if (!this.validationTypes[type]) {
      console.error(`[removeValidation] ${type}은 정의되지 않은 validation type입니다.`);
      return false;
    }

    this.validationTypes[type] = undefined;
  });

  removeValidationToElement = getValidatedMethod(["string"])(function(name) {
    this.elementsForValidation = this.elementsForValidation.filter(
      ({ name: _name }) => _name !== name,
    );
  });

  _getInvalidInfo = (type, value) => {
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
  };

  _getValidatedInfo = (validationTypes, value) => {
    return validationTypes.reduce((validatedInfo, type) => {
      validatedInfo = validatedInfo.concat(this._getInvalidInfo(type, value));

      return validatedInfo;
    }, []);
  };
}

export default FormState;
