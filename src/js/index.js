import FormValidator from "./FormValidator";

const formValidator = new window.FormValidator("#form");

formValidator
  .setValidationToElement("email", ["required"])
  .setValidationToElement("password", ["required"]);

formValidator
  .setValidationTypes("email", /(.com)/, "이메일 형식이 아닙니다.")
  .setValidationTypes("required", (value) => value.length !== 0, "필수 입력란입니다.");

formValidator.setTargetToAppendErrorMsg("email", ".password-confirm-box");
formValidator.result();
