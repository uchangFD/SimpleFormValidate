import getType from "./getType";

export default (target, expect) => {
  const expectType = getType(expect);

  if (expectType !== "array" && expectType !== "string") {
    throw new Error(`${expect} is not string or array type`);
  }

  if (expectType === "array") {
    expect.forEach((e) => {
      if (getType(e) !== "string") {
        throw new Error(`${e} is not string`);
      }
    });
  }

  const targetType = getType(target);
  let result;

  if (expectType === "array") {
    result = expect.some((e) => targetType === e);
  } else {
    result = targetType === expect;
  }

  if (!result) {
    throw new Error(`The target is different from the expected value. \n target type: ${target}, expect: ${expect}`);
  }
};
