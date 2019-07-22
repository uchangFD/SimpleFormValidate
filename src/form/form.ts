import Validation, { IValidation } from "../validation/";

interface IValidateInfo {
  [el: string]: HTMLElement;
  [after: string]: Function | undefined;
  [validateTypes: string]: Array<string> | Array<undefined>;
}

interface IValidateInfos {
  [id: string]: IValidateInfo;
}

interface IValidateResult {
  [isValid: string]: boolean;
  [message: string]: string;
}

interface INodeInfo {
  [name: string]: string;
  [matcher: string]: Function | RegExp;
  [errorMsg: string]: string;
}

interface IForm {
  formData: IValidateInfos;
  validation: IValidation;
  setType(name: string, types: string | Array<string>): this | undefined;
  setAfter(name: string, after: Function): this;
  startAfter(validationResult: IValidateResult | Array<IValidateResult>): this;
  validate(name: string): IValidateResult | Array<IValidateResult>;
}

const getValidationResults = (name, validation, { el, validationTypes, after }) => {
  const value = el.value;

  const validationResults = validationTypes.reduce((acc, type) => {
    const node = validation.get(type);

    if (node) {
      acc.push(node.validate(value));
    }

    return acc;
  }, []);

  return {
    name,
    isValid: validationResults.every(({ isValid }) => isValid),
    results: validationResults,
    after,
  };
};
export default class Form implements IForm {
  formData;
  validation;

  constructor(selector: HTMLFormElement | string) {
    if (!selector) {
      throw new Error("You must assign selector");
    }

    this.validation = (() => {
      const _validation = new Validation();

      return {
        create(info) {
          _validation.createNode(info);
        },
        update(name, info) {
          _validation.updateNode(name, info);
        },
        remove(name) {
          return _validation.removeNode(name);
        },
        get(name) {
          return _validation.getNode(name);
        },
      };
    })();

    try {
      let formEl: HTMLFormElement;

      if (typeof selector === "string") {
        formEl = document.querySelector(selector);
      } else {
        formEl = selector;
      }

      const willValidateNode: Array<HTMLFormElement> = Array.from(formEl.querySelectorAll("[name]"));

      this.formData = willValidateNode.reduce((acc, el) => {
        const { name } = el;

        acc[name] = {
          el,
          after: undefined,
          validationTypes: [],
        };

        return acc;
      }, {});
    } catch (e) {
      throw new Error(e);
    }
  }

  setType(name, types) {
    const validationInfo = this.formData[name];

    if (!validationInfo) {
      return;
    }

    const { validationTypes } = validationInfo;

    if (Array.isArray(types)) {
      types.forEach((type) => {
        validationTypes.splice(-1, 0, type);
      });
    } else {
      validationTypes.push(types);
    }

    return this;
  }

  setAfter(name, after) {
    const validationInfo = this.formData[name];

    if (!validationInfo) {
      return;
    }

    validationInfo.after = after;

    return this;
  }

  startAfter(validationResult) {
    if (Array.isArray(validationResult)) {
      validationResult.forEach(({ results, after }) => {
        if (typeof after === "function") {
          after(results);
        }
      });
    }

    return this;
  }

  validate(name) {
    const { formData, validation } = this;

    if (!name) {
      return Object.keys(formData).map((key) => getValidationResults(key, validation, formData[key]));
    }

    if (typeof name !== "string" && !formData[name]) {
      return;
    }

    return getValidationResults(name, validation, formData[name]);
  }
}
