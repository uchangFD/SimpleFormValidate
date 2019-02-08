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
    validationTypes = {};

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
        console.error(`${form}은 존재하지 않는 element입니다.`);
        return false;
      }

      this.init();
    }

    init = () => {
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
    };

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

    addValidationTypes = getValidatedMethod(["string"], ["function", "regexp"], ["string"])(
      function(type, checker, errorMsg) {
        if (!this.validationTypes[type]) {
          this.validationTypes[type] = [];
        }

        this.validationTypes[type].push({
          checker,
          errorMsg,
        });
      },
    );

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

    removeValidationTypes = getValidatedMethod(['string'])(function(type) {
      if (!this.validationTypes[type]) {
        console.error(`[removeValidation] ${type}은 정의되지 않은 validation type입니다.`);
        return false;
      }

      this.validationTypes[type] = undefined;
    });

    removeValidationToElement = getValidatedMethod(['string'])(function(name) {
      this.elementsForValidation = this.elementsForValidation.filter(({ name: _name }) => _name !== name);
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

  class ErrorMsg {
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

    setTargetToAppendErrorMsg = getValidatedMethod(['string'], ['string', 'element'])(function(name, target) {
      // if (!this.elementsForValidation.some(({ name: _name }) => _name === name)) {
      //   console.error(`addTarget으로 추가된 ${name}이 없습니다.`);
      //   return false;
      // }

      let targetEl;

      if (compareType(target, 'element')) {
        targetEl = target;
      } else {
        targetEl = target.length !== 0 ? document.querySelector(target) : undefined;
      }

      if (!targetEl) {
        console.error(`${target} 을 찾을 수 없습니다.`);
        return this;
      }

      this.targetsToAppendErrorMsg = this.targetsToAppendErrorMsg.filter(({ name: _name }) => name !== _name);
      this.targetsToAppendErrorMsg.push({
        name,
        targetEl,
      });
    })

    makeErrorMsg = (validatedInfos) => {
      const errorMsgTemplate = this.errorMsgTemplate;

      this.errorMsgs = validatedInfos.reduce((_errorMsgs, { isValid, el, name, result }) => {
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
    };

    appendErrorMsg = () => {
      this.errorMsgs.forEach(({ target, errorMsgEl }) => {
        target.appendChild(errorMsgEl);
        // errorMsgEl.parentNode.appendChild(errorMsgEl);
      });

      return this;
    }

    removeErrorMsgAll = () => {
      this.errorMsgs.forEach(({ target, errorMsgEl }) => {
        target.removeChild(errorMsgEl);
      });

      return this;
    }

    _findTargetToAppendErrorMsg = (name) => {
      return this.targetsToAppendErrorMsg.filter(({ name: _name }) => _name === name).map(({ targetEl }) => targetEl);
    }

    _createElement = (tagName) => document.createElement(tagName);

    _setAttributes = (el, attributes) => {
      for (let prop in attributes) {
        if (attributes.hasOwnProperty(prop)) {
          el[prop] = attributes[prop];
        }
      }
    };

    _setStyles = (el, styles) => {
      for (let prop in styles) {
        if (styles.hasOwnProperty(prop)) {
          el.styles[prop] = styles[prop];
        }
      }
    };

    _defaultTemplate = () => {
      const el = document.createElement("span");

      el.setAttribute("class", "error-msg");

      return el;
    };
  }

  class FormValidator {
    constructor(form) {
      this.formState = new FormState(form);
      this.formErrorMsg = new ErrorMsg();
    }

    addTarget = (name, validationTypes) => {
      this.formState.addValidationToElement(name, validationTypes);
      return this;
    };

    addValidation = (type, checker, errorMsg) => {
      this.formState.addValidationTypes(type, checker, errorMsg);
      return this;
    };

    removeTarget = (name) => {
      this.formState.removeValidationToElement(name);
      return this;
    }

    removeValidation = (type) => {
      this.formState.removeValidationTypes(type);
      return this;
    }

    setErrorMsg = (tagName, attributes, styles) => {
      this.formErrorMsg.setErrorMsgTemplate(tagName, attributes, styles);
      return this;
    };

    setErrorMsgPosition = (name, target) => {
      this.formErrorMsg.setTargetToAppendErrorMsg(name, target);
      return this;
    }

    result = () => {
      return this.formState.validate();
    }

    validate = () => {
      const validatedInfos = this.formState.validate();

      this.formErrorMsg.removeErrorMsgAll().makeErrorMsg(validatedInfos).appendErrorMsg();
      return validatedInfos;
    };
  }

  window.FormValidator = FormValidator;
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
        result = validationTypes.indexOf(getType(param)) > -1;

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
