import test from "ava";
import ValidationNode from "../../src/validation/validationNode";

test.beforeEach((t) => {
  t.context.validationNode = new ValidationNode({});
});

test("validation.setMatcher(Function) => undefined", (t) => {
  t.is(t.context.validationNode.setMatcher(function() {}), undefined);
});

test("validation.setMatcher(Regexp) => undefined", (t) => {
  t.is(t.context.validationNode.setMatcher(/^test/g), undefined);
});

test("validation.setMatcher(String) => throw Error", (t) => {
  t.throws((t) => t.context.validationNode.setMatcher("hello"));
});

test("validation.setName(String) => undefined", (t) => {
  t.is(t.context.validationNode.setName("hello"), undefined);
});

test("validation.setName(Number) => throw Error", (t) => {
  t.throws((t) => t.context.validationNode.setName(3));
});
