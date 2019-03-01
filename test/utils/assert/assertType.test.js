import test from "ava";
import { assertType } from "../../../src/js/utils/assertType";

test("assertType throw Error", (t) => {
  const str = "hi";

  t.throws(() => {
    assertType(str, "str", "array");
  });
});

test("assertType not throw Error", (t) => {
  const str = "hi";

  t.notThrows(() => {
    assertType(str, "str", "string");
  });
});
