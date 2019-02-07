import FormValidator from "./FormValidator";

const formValidator = new window.FormValidator("#form");

formValidator.addTarget("email", ["required"]).addTarget("password", ["required"]);

formValidator
  .addValidation("email", /(.com)/, "이메일 형식이 아닙니다.")
  .addValidation("required", (value) => value.length !== 0, "필수 입력란입니다.");

formValidator.removeValidation("requiredd");

formValidator.setErrorMsgPosition("email", ".password-confirm-box");
formValidator.result();
