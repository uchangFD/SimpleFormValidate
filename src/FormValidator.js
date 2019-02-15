import FormState from "./FormState";
import FormErrorMsg from "./FormErrorMsg";

class FormValidator {
  constructor(form) {
    this.formState = new FormState(form);
    this.formErrorMsg = new FormErrorMsg();
  }

  addTarget(name, validationTypes) {
    this.formState.addValidationToElement(name, validationTypes);
    return this;
  }

  addValidation(type, checker, errorMsg) {
    this.formState.addValidationTypes(type, checker, errorMsg);
    return this;
  }

  removeTarget(name) {
    this.formState.removeValidationToElement(name);
    return this;
  }

  removeValidation(type) {
    this.formState.removeValidationTypes(type);
    return this;
  }

  setErrorMsg (tagName, attributes, styles) {
    this.formErrorMsg.setErrorMsgTemplate(tagName, attributes, styles);
    return this;
  }

  setErrorMsgPosition (name, target) {
    this.formErrorMsg.setTargetToAppendErrorMsg(name, target);
    return this;
  }

  result () {
    return this.formState.validate();
  }

  validate () {
    const validatedInfos = this.formState.validate();

    this.formErrorMsg
      .removeErrorMsgAll()
      .makeErrorMsg(validatedInfos)
      .appendErrorMsg();
    return validatedInfos;
  }
}

export default FormValidator;
