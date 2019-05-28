import test from "ava";
import ValidationNode from "../../src/validation/validationNode";

test.beforeEach((t) => {
  t.context.validationNode = new ValidationNode({
    name: "isNumber",
    matcher: /^[0-9]+$/g,
    errorMsg: "Not number",
  });
});

/*
  validationNode.setMatcher
*/

test("validationNode.setMatcher(Function) => Not throw Error", (t) => {
  t.notThrows(() => {
    t.context.validationNode.setMatcher(function() {});
  });
});

test("validationNode.setMatcher(Regexp) => Not throw Error", (t) => {
  t.notThrows(() => {
    t.context.validationNode.setMatcher(/^test/g);
  });
});

test("validationNode.setMatcher(String) => throw Error", (t) => {
  t.throws(() => {
    t.context.validationNode.setMatcher("hello");
  });
});

/*
  validationNode.setName
*/

test("validationNode.setName(String) => Not throw Error", (t) => {
  t.notThrows(() => {
    t.context.validationNode.setName("hello");
  });
});

test("validationNode.setName(Number) => throw Error", (t) => {
  t.throws(() => {
    t.context.validationNode.setName(3);
  });
});

/*
  validationNode.setErrorMsg
*/

test("validationNode.setErrorMsg(String) => Not throw Error", (t) => {
  t.notThrows(() => {
    t.context.validationNode.setErrorMsg("hello");
  });
});

test("validationNode.setErrorMsg(Number) => throw Error", (t) => {
  t.throws(() => {
    t.context.validationNode.setErrorMsg(3);
  });
});

/*
  validationNode.setState
*/

test("validationNode.setState(Object) => Not throw Error", (t) => {
  t.notThrows(() => {
    t.context.validationNode.setState({});
  });
});

test("validationNode.setState(Number) => throw Error", (t) => {
  t.throws(() => {
    t.context.validationNode.setState(3);
  });
});
