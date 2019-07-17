interface IValidateInfos {
  [name: string]: string;
  [validateTypes: string]: Array<string> | undefined;
}

interface IForm {
  formData: Array<IValidateInfos>;
}

export default class Form implements IForm {
  formData;

  constructor(selector: string) {
    try {
      const formEl: HTMLFormElement = document.querySelector(selector);
    } catch (e) {
      throw new Error(e);
    }
  }
}
