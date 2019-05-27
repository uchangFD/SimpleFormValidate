import getType from "./getType";

export default (target, expect) => {
  const targetType = getType(target);

  if (targetType === expect) {
    return true;
  }

  throw new Error(`The target is different from the expected value. \n target type: ${target}, expect: ${expect}`);
};
