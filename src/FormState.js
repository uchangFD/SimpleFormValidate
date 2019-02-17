import { compareType, assertType } from "./utils";

class FormState {
  constructor(infos) {
    this.infos = infos;
    this.validationTypes = {};
  }

  static byForm(form) {
    const infos = Array.from(form)
      .map(el => {
        return {
          name: el.name, nodeName: el.nodeName, el, validationTypes: [],
        };
      });

    return new FormState(infos);
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
        const result = this._validateItem(validationTypes, el.value);
        return {
          el,
          name,
          result,
          isValid: result.some(({ isValid }) => isValid),
        };
      });
  }

  removeValidationTypes (type) {
    assertType(type, 'type', 'string');
    if (!this.validationTypes[type]) delete this.validationTypes[type];
  }

  removeValidationToElement(name) {
    assertType(name, 'name', 'string');

    this.infos = this.infos.filter(
      ({ name: _name }) => _name !== name,
    );
  }

  _validateItem (types, value) {
    return types.reduce((result, type) => {
      const infos = (this.validationTypes[type] || []).map(({ checker, errorMsg }) => {
        return {
          isValid: compareType(checker, "function") ? checker(value) : checker.test(value),
          errorMsg,
        };
      });
      return [...result, ...infos];
    }, []);
  }
}

export default FormState;
