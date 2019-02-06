(function(global, utils) {
  if (!global) {
    console.error("browser 전용 FormValidator");
    return;
  }

  if (global.FormValidator) {
    console.error("FormValidator가 이미 존재합니다.");
    return;
  }

  const { compareType, getValidatedMethod } = utils;

  class FormState {
    formEl;
    elementsForValidation;
    validationTypes = [];

    constructor(form) {
      if (!(compareType(form, "element") || compareType(form, "string"))) {
        console.error(`${form}은 string or element 타입이 아닙니다.`);
        return false;
      }

      if (compareType(form, "string")) {
        this.formEl = document.querySelector(form);
      } else {
        this.formEl = form;
      }

      if (!this.formEl) {
        console.error(`${this.formEl}은 존재하지 않는 element입니다.`);
        return false;
      }

      this.init();
      // console.log(this.setValidationToElement([]));
    }

    init = () => {
      const self = this;

      self.elementsForValidation = Array.from(self.formEl.querySelectorAll("[name]")).map(
        self._collectElementInfo,
      );

      console.log(self.elementsForValidation);
    };

    setValidationToElement = getValidatedMethod(["string"], ["string"])(function(...args) {
      // params [name, validation[ Array['String'] ]]

      const { elementsForValidation } = this;
      const [name, validationTypes] = Array.from(args);

      const [elementInfo] = elementsForValidation.filter(({ name: _name }) => _name === name);

      if (!elementInfo) {
        console.error(`${name}은 존재하지 않는 name 속성값입니다.`);
        return this;
      }

      elementInfo.validationTypes = elementInfo.validationTypes.concat(validationTypes);
    });

    setValidationTypes = getValidatedMethod(["string"], ["function", "regexp"], ["string"])(
      function(...args) {
        const [type, checker, errorMsg] = Array.from(args);

        this.validationTypes.push({
          type,
          checker,
          errorMsg,
        });

        console.log(this.validationTypes);
      },
    );

    _collectElementInfo = (element) => {
      // 수집할 정보들 [name, nodeName, element, validationTypes]
      const name = element.name;
      const nodeName = element.nodeName;

      return {
        name,
        nodeName,
        el: element,
        validationTypes: [],
      };
    };
  }

  class ErrorMsg {
    constructor() {}
  }

  class FormValidator {
    constructor(form) {
      this.formState = new FormState(form);
    }

    setValidationToElement = (...args) => {
      this.formState.setValidationToElement(...args);
      return this;
    };

    setValidationTypes = (...args) => {
      console.log(...args);
      this.formState.setValidationTypes(...args);
      return this;
    };
  }

  // const testMethod = utils.getValidatedMethod(["string"], ["string"])(function(...args) {
  //   console.log("testMethod", args);
  // });

  const formValidator = new FormValidator("#form");

  formValidator
    .setValidationToElement("email", ["required", "email"])
    .setValidationToElement("password", ["required", "password"]);

  formValidator
    .setValidationTypes("email", /(.com)/, "이메일 형식이 아닙니다.")
    .setValidationTypes("required", (value) => value.length !== 0, "필수 입력란입니다.");
})(
  window,
  (function() {
    const getType = (target) =>
      Object.prototype.toString
        .call(target)
        .slice(8, -1)
        .toLowerCase();

    const compareType = (target, type) => getType(target) === type;

    const validateTypeAboutParam = (param, validationTypes) => {
      if (validationTypes === "all") {
        return true;
      }

      let result = true;

      if (typeof param !== "object") {
        console.log("validationTypes: ", validationTypes);
        result = validationTypes.indexOf(getType(param)) > -1 ? true : false;

        if (!result) {
          console.error(
            `${param}의 type [${getType(param)}]은 [${validationTypes}] 타입이 아닙니다.`,
          );
        }
      }

      if (compareType(param, "array")) {
        result = param.reduce((isValid, _param, index) => {
          const _result = validateTypeAboutParam(_param, validationTypes);

          if (!_result) {
            isValid = false;
          }

          return isValid;
        }, true);
      }

      if (compareType(param, "object")) {
        for (let prop in param) {
          if (param.hasOwnProperty(prop)) {
            const _param = param[prop];
            const isValid = validateTypeAboutParam(_param, validationTypes);

            if (!isValid) {
              result = false;
            }
          }
        }
      }

      return result;
    };

    const getValidatedMethod = (...validationTypes) => (fn) => {
      return function(...args) {
        const isValid = Array.from(args).reduce((result, arg, index) => {
          const _isValid = validateTypeAboutParam(arg, validationTypes[index]);

          if (!_isValid) {
            result = false;
          }

          return result;
        }, true);

        if (!isValid) {
          return this;
        }
        return fn.apply(this, args);
      };
    };

    return {
      getType,
      compareType,
      getValidatedMethod,
    };
  })(),
);
