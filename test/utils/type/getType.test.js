import test from "ava";
import { getType } from "../../../src/js/utils/type";

test("getType(STRING): ", (t) => {
  const testValue = "hi";
  const result = getType(testValue);

  t.is(result, "string");
});

test("getType(NUMBER): ", (t) => {
  const testValue = 110;
  const result = getType(testValue);

  t.is(result, "number");
});

test("getType(BOOLEAN): ", (t) => {
  const testValue = true;
  const result = getType(testValue);

  t.is(result, "boolean");
});

test("getType(Symbol): ", (t) => {
  const testValue = Symbol("hi");
  const result = getType(testValue);

  t.is(result, "symbol");
});

test("getType(OBJECT): ", (t) => {
  const testValue = {};
  const result = getType(testValue);

  t.is(result, "object");
});

test("getType(ARRAY): ", (t) => {
  const testValue = [];
  const result = getType(testValue);

  t.is(result, "array");
});

test("getType(undefined): ", (t) => {
  const testValue = undefined;
  const result = getType(testValue);

  t.is(result, "undefined");
});

test("getType(null): ", (t) => {
  const testValue = null;
  const result = getType(testValue);

  t.is(result, "null");
});
