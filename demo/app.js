import FormValidator from '../src';

let formValidator = new FormValidator("#form");

formValidator
  .addValidation("required", (value) => !!value, "필수 입력란입니다.");

formValidator
  .addTarget("email", ["required"])
  .addTarget("password", ["required"]);

document.forms[0].addEventListener('submit', e => {
  e.preventDefault();
  formValidator.validate();
});
