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
      console.error(`${param}의 type [${getType(param)}]은 [${validationTypes}] 타입이 아닙니다.`);
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

export default {
  getType,
  compareType,
  getValidatedMethod,
};
