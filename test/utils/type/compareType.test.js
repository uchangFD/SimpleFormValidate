import test from "ava";
import { compareType } from "../../../src/js/utils/type";

test('compareType(STRING, "string")', (t) => {
  const testValue = "hi";
  const testType = "string";
  const result = compareType(testValue, testType);

  t.is(result, true);
});

test('compareType(NUMBER, "number")', (t) => {
  const testValue = 100;
  const testType = "number";
  const result = compareType(testValue, testType);

  t.is(result, true);
});

test('compareType(Symbol, "symbol")', (t) => {
  const testValue = Symbol("hi");
  const testType = "symbol";
  const result = compareType(testValue, testType);

  t.is(result, true);
});

test('compareType(undefined, "undefined")', (t) => {
  const testValue = undefined;
  const testType = "undefined";
  const result = compareType(testValue, testType);

  t.is(result, true);
});

test('compareType(null, "null")', (t) => {
  const testValue = null;
  const testType = "null";
  const result = compareType(testValue, testType);

  t.is(result, true);
});

test('compareType(object, "object")', (t) => {
  const testValue = {};
  const testType = "object";
  const result = compareType(testValue, testType);

  t.is(result, true);
});

test('compareType(array, "array")', (t) => {
  const testValue = [];
  const testType = "array";
  const result = compareType(testValue, testType);

  t.is(result, true);
});
