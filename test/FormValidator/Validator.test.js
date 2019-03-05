import test from "ava";
import Validator from "../../src/js/FormValidator/Validator";
import { createElement, setAttributes } from "../../src/js/utils/dom";
import sequencer from "../../src/js/utils/sequencer";

const form = sequencer.run([createElement, "form"], [setAttributes, { id: "#form" }]);
const emailInput = sequencer.run([createElement, "input"], [setAttributes, { name: "email" }]);

form.appendChild(emailInput);

let validator;

test("init() => this.elementInfo에 email 정보가 들어가 있는지", (t) => {
  validator = new Validator(form);

  const emailInfo = validator.elementInfos.find(({ name }) => name === "email");

  t.is(emailInfo.name, "email");
});

test("addValidationType('require', value => !!value, '필수 입력란입니다.') => this.validationTypes에 validate정보가 들어가 있는지", (t) => {
  validator.addValidationType("require", (value) => !!value, "필수 입력란입니다.");

  t.is(validator.validationTypes.hasOwnProperty("require"), true);
});

test("removeValidationType('require') => this.validationTypes에 'require'가 삭제되어 있는지.", (t) => {
  validator.removeValidationType("require");

  t.is(validator.validationTypes.hasOwnProperty("require"), false);
});

test("addElementToValidate('email', 'require') => this.elementInfosToValidate에 검사할 목록이 추가되어 있는가?", (t) => {
  validator.addElementToValidate("email", "require");

  const target = validator.elementInfosToValidate.find(({ name }) => name === "email");
  t.is(target.name, "email");
  t.is(target.validationTypes.indexOf("require") > -1, true);
});

test("removeElementToValidate('email') => this.elementInfosToValidate에 검사할 목록이 삭제되어 있는가?", (t) => {
  validator.removeElementToValidate("email");

  const target = validator.elementInfosToValidate.find(({ name }) => name === "email");
  t.is(typeof target, "undefined");
});

test("validate() => 검사 결과가 정상적으로 출력되는지", (t) => {
  validator.addValidationType("require", (value) => !!value, "필수 입력란입니다.");
  validator.addElementToValidate("email", "require");

  const result = validator.validate();

  t.is(result.length > 0, true);
  t.is(result[0].el.name, "email");
  t.is(result[0].results[0].isValid, false);
  t.is(result[0].results[0].errorMsg, "필수 입력란입니다.");
});
