import ErrorMsg from "./ErrorMsg";
import Validator from "./Validator";

class FormValidator {
  constructor(form) {
    this.validator = new Validator(form);
    this.errorMsg = new ErrorMsg();
  }

  addTarget(name, validationTypes) {
    this.validator.addElementToValidate(name, validationTypes);
    return this;
  }

  addValidation(type, matcher, errorMsg) {
    this.validator.addValidationType(type, matcher, errorMsg);
    return this;
  }

  removeTarget(name) {
    this.validator.removeElementToValidate(name);
    return this;
  }

  removeValidation(type) {
    this.validator.removeValidationType(type);
    return this;
  }

  setErrorMsg(tagName, attributes, styles) {
    this.errorMsg.setErrorMsgTemplate(tagName, attributes, styles);
    return this;
  }

  setErrorMsgPosition(name, target) {
    this.errorMsg.setTargetToAppendErrorMsg(name, target);
    return this;
  }

  result() {
    return this.validator.validate();
  }

  validate() {
    const validatedInfos = this.result();
    const errorMsgTemplate = this.errorMsg.getErrorMsgTemplate();

    const errorMsgs = validatedInfos.reduce((acc, { name, results }) => {
      const cloneErrorMsgTemplate = errorMsgTemplate.cloneNode(true);

      for (const { isValid, errorMsg } of results) {
        if (!isValid) {
          cloneErrorMsgTemplate.innerText = errorMsg;

          acc.push({
            name,
            errorMsg: cloneErrorMsgTemplate,
          });

          return acc;
        }
      }

      return acc;
    }, []);

    // append errorMsgs;
    this.errorMsg
      .initErrorMsgs()
      .setErrorMsgs(errorMsgs)
      .appendErrorMsgs();

    console.log(errorMsgs);

    return validatedInfos;
  }
}

export default FormValidator;
