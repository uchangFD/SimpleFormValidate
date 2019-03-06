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

    return validatedInfos;
  }
}

export default FormValidator;
