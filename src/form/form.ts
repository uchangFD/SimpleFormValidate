import Validation, { IValidation } from "../validation/";

interface IValidateInfo {
  [el: string]: HTMLElement;
  [validateTypes: string]: Array<string> | Array<undefined>;
}

interface IValidateInfos {
  [id: string]: IValidateInfo;
}

interface INodeInfo {
  [name: string]: string;
  [matcher: string]: Function | RegExp;
  [errorMsg: string]: string;
}

// interface IValidationApis {
//   [add: string]: (info: INodeInfo): void;
//   [update: string]: (name: string, info: INodeInfo): void;
//   [remove: string]: (name: string): void;
//   [get: string]: (name: string): INodeInfo;
// }

interface IForm {
  formData: IValidateInfos;
  // validation: IValidation;
  setType(name: string, types: string | Array<string>): this | undefined;
  // validation();
}

const getValidationResults = (name, validation, { el, validationTypes }) => {
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
    results: validationResults,
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
