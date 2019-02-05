(function(global, utils) {
  if (!global) {
    console.error("browser 전용 FormValidator");
    return;
  }

  if (global.FormValidator) {
    console.error("FormValidator가 이미 존재합니다.");
    return;
  }

  class FormState {
    constructor() {}
  }

  class ErrorMsg {
    constructor() {}
  }

  class FormValidator {
    constructor() {}
  }

  console.log(
    utils.checkParams([["string"], ["string", "number", "boolean"]])("hi", {
      a: "number",
      b: "world",
      c: ["hi", 1],
      d: {
        e: "3",
        f: false,
      },
    }),
  );
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
        result = validationTypes.indexOf(getType(param)) > -1 ? true : false;

        if (!result) {
          console.error(`${param}은 [${validationTypes}] 타입이 아닙니다.`);
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

    const checkParams = (validationTypes) => {
      return function(...args) {
        return Array.from(args).reduce((result, arg, index) => {
          const isValid = validateTypeAboutParam(arg, validationTypes[index]);

          if (!isValid) {
            result = false;
          }

          return result;
        }, true);
      };
    };

    return {
      getType,
      compareType,
      checkParams,
    };
  })(),
);
