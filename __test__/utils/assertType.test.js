import test from "ava";
import assertType from "../../src/utils/assertType";

test("target: 'hello world', expect: 'string'", (t) => {
  t.is(assertType("hello world", "string"), true);
});
