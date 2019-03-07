import FormValidator from "./FormValidator/FormValidator";

window.FormValidator = FormValidator;

const formValidator = new FormValidator("#form");

formValidator.addValidation("required", (value) => !!value, "필수 입력란입니다");
formValidator.addValidation("number", (value) => typeof value === "number", "숫자가 아닙니다.");
formValidator.addTarget("email", ["required"]).addTarget("password", ["required", "number"]);
formValidator.setErrorMsgPosition(
  "email",
  document.querySelector(`[name="confirmPassword"]`).parentNode,
);
formValidator.validate();
