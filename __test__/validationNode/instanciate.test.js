import test from "ava";
import ValidationNode from "../../src/validation/validationNode";

test("new ValidationNode() => Not throw Error", (t) => {
  t.notThrows((t) => {
    new ValidationNode();
  });
});

test("new ValidationNode(Array) => throw Error", (t) => {
  t.throws((t) => {
    new ValidationNode([]);
  });
});
