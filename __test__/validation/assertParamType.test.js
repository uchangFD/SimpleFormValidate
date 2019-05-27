import test from "ava";
import Validation from "../../src/validation/validation";

test.before((t) => {
  t.context.validation = new Validation();
});

/*
  validation.removeNode
*/
test("removeNode(string) => Not throw Error", (t) => {
  t.notThrows((t) => t.context.validation.removeNode("isString"));
});
test("removeNode(Array) => throw Error", (t) => {
  t.throws((t) => t.context.validation.removeNode([]));
});

/*
  validation.updateNode
*/
test("updateNode(string, object) => Not throw Error", (t) => {
  t.notThrows((t) => t.context.validation.updateNode("isString", {}));
});
test("updateNode(string) => Not throw Error", (t) => {
  t.notThrows((t) => t.context.validation.updateNode("isString"));
});
test("updateNode(string, array) => throw Error", (t) => {
  t.throws((t) => t.context.validation.updateNode("isString", []));
});

/*
  validation.getNode
*/
test("getNode(string) => Not throw Error", (t) => {
  t.notThrows((t) => t.context.validation.getNode("isString", {}));
});
test("getNode(array) => throw Error", (t) => {
  t.throws((t) => t.context.validation.getNode([]));
});

/*
  validation.setMatcher
*/
test("setMatcher(string, Boolean) => Not throw Error", (t) => {
  t.notThrows((t) => t.context.validation.setMatcher("isString", false));
});
test("setMatcher(number) => throw Error", (t) => {
  t.throws((t) => t.context.validation.setMatcher(3));
});
