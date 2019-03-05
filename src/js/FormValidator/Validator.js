import { assertType } from "../utils/assertType";
import { compareType } from "../utils/type";

class Validator {
  constructor(form) {
    assertType(form, "[constructor] form", ["element", "string"]);

    if (compareType(form, "string")) {
      this.formEl = document.querySelector(form);
    } else {
      this.formEl = form;
    }

    if (!this.formEl) {
      throw Error(`${form}은 존재하지 않는 element입니다.`);
    }

    this.elementInfos = [];
    this.elementInfosToValidate = [];
    this.validationTypes = {};

    this.init();
  }

  init() {
    this.elementInfos = Array.from(this.formEl.querySelectorAll("[name]")).map((element) => {
      // 수집할 정보들 [name, nodeName, element, validationTypes]
      const name = element.name;
      const nodeName = element.nodeName;

      return {
        name,
        nodeName,
        el: element,
        validationTypes: [],
      };
    });
  }

  addValidationType(type, matcher, errorMsg) {
    assertType(type, "[addValidation] type", ["string"]);
    assertType(matcher, "[addValidation] matcher", ["regexp", "function"]);
    assertType(errorMsg, "[addValidation] errorMsg", ["string"]);

    const validationTypes = this.validationTypes;

    validationTypes[type] = { matcher, errorMsg };
  }

  removeValidationType(type) {
    assertType(type, "[removeValidationType] type", ["string"]);

    const validationTypes = this.validationTypes;

    if (!validationTypes.hasOwnProperty(type)) {
      throw Error(`[removeValidation] ${type}은 정의되지 않은 validation type입니다.`);
    }

    delete validationTypes[type];
  }

  addElementToValidate(name, validationTypes) {
    assertType(name, "[addElementToValidate] name", ["string"]);
    assertType(validationTypes, "[addElementToValidate] validationTypes", ["string", "array"]);

    const elementInfo = this.elementInfos.find(({ name: _name }) => _name === name);

    if (typeof elementInfo === "undefined") {
      throw Error(`[addValidation] ${name}은 존재하지 않는 name 속성값입니다.`);
    }

    if (compareType(validationTypes, "string")) {
      validationTypes = [validationTypes];
    }

    elementInfo.validationTypes = elementInfo.validationTypes.concat(validationTypes);
    this.elementInfosToValidate.push(elementInfo);
  }

  removeElementToValidate(_name) {
    assertType(_name, "[removeElementToValidate] _name", ["string"]);

    this.elementInfosToValidate = this.elementInfosToValidate.filter(({ name }) => name !== _name);
  }

  validate() {
    const validationInfos = this.validationTypes;

    return this.elementInfosToValidate.map(({ el, validationTypes }) => {
      const value = el.value;
      const validatedInfos = validationTypes.reduce((acc, validationType) => {
        if (!validationInfos.hasOwnProperty([validationType])) {
          return acc;
        }

        const { matcher, errorMsg } = validationInfos[validationType];

        let isValid;

        if (compareType(matcher, "regexp")) {
          isValid = matcher.test(value);
        } else {
          isValid = matcher(value);
        }

        acc.push({ isValid, errorMsg });

        return acc;
      }, []);

      return {
        el,
        results: validatedInfos,
      };
    });
  }
}

export default Validator;
