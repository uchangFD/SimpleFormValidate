import test from "ava";
import assertType from "../../src/utils/assertType";

test("target: 'hello world', expect: 'string' => Not throw Error", (t) => {
  t.notThrows((t) => assertType("hello world", "string"));
});

test("target: 'hello world', expect: 3 => throw Error", (t) => {
  t.throws(() => assertType("hello world", 3));
});

test("target: 'hello world', expect: [3, []] => throw Error", (t) => {
  t.throws(() => assertType("hello world", [3, []]));
});
