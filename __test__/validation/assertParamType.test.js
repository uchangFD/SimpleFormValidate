import test from "ava";
import Validation from "../../src/validation/validation";

test.beforeEach((t) => {
  const validation = (t.context.validation = new Validation());

  validation.createNode({
    name: "isNumber",
    matcher: /^[0-9]+$/g,
    errorMsg: "Not Number",
  });
});

/*
  validation.removeNode
*/
test("removeNode(string) => Not throw Error", (t) => {
  t.notThrows(() => {
    t.context.validation.removeNode("isString");
  });
});
test("removeNode(Array) => throw Error", (t) => {
  t.throws(() => {
    t.context.validation.removeNode([]);
  });
});

/*
  validation.updateNode
*/
test("updateNode(string, object) => Not throw Error", (t) => {
  t.notThrows(() => {
    t.context.validation.updateNode("isNumber", {});
  });
});
test("updateNode(string) => Not throw Error", (t) => {
  t.notThrows(() => {
    t.context.validation.updateNode("isNumber");
  });
});
test("updateNode(string, array) => throw Error", (t) => {
  t.throws(() => {
    t.context.validation.updateNode("isString", []);
  });
});

/*
  validation.getNode
*/
test("getNode(string) => Not throw Error", (t) => {
  t.notThrows(() => {
    t.context.validation.getNode("isString", {});
  });
});
test("getNode(array) => throw Error", (t) => {
  t.throws(() => {
    t.context.validation.getNode([]);
  });
});

/*
  validation.setMatcher
*/
test("setMatcher(string, Boolean) => Not throw Error", (t) => {
  t.notThrows(() => {
    t.context.validation.setMatcher("isString", false);
  });
});
test("setMatcher(number) => throw Error", (t) => {
  t.throws(() => {
    t.context.validation.setMatcher(3);
  });
});
