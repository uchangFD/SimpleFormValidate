import test from "ava";
import Validation from "../../../src/validation/validation";

test.beforeEach((t) => {
  t.context.validation = new Validation();
});

test("Check parameter type: createNode(Object) => Not throw error", (t) => {
  t.notThrows(() => {
    t.context.validation.createNode({
      name: "isNumber",
      errorMsg: "Not number",
      matcher: /^[0-9]+$/g,
    });
  });
});

test("Info object must need properties(name, errorMsg, matcher) and property types", (t) => {
  t.notThrows(() => {
    t.context.validation.createNode({
      name: "isNumberRegexp",
      errorMsg: "Not number",
      matcher: /^[0-9]+$/g,
    });
  });
});

test("Do not create to same name", (t) => {
  t.throws(() => {
    t.context.validation.createNode({
      name: "isNumber",
      errorMsg: "Not number",
      matcher: (value) => /^[0-9]+$/g.test(value),
    });
    t.context.validation.createNode({
      name: "isNumber",
      errorMsg: "Not number",
      matcher: (value) => /^[0-9]+$/g.test(value),
    });
  });
});
