import { getType } from "./type";

/**
 *
 * @param {any} target
 * @param {String} name
 * @param {String|Array} validationTypes
 * @description 타입 확인
 * @example
 *  assertType([], 'validations', ['string', 'array'])
 *  assertType([], 'validations', 'array')
 * @return void
 */
export const assertType = (target, name, validationTypes) => {
  const type = getType(target);
  let isValid = false;

  if (!Array.isArray(validationTypes)) {
    validationTypes = [validationTypes];
  }

  for (const validationType of validationTypes) {
    if (type.indexOf(validationType) > -1) {
      isValid = true;
      break;
    }
  }

  if (!isValid) {
    throw Error(`${name} is not the expected ${validationTypes}.`);
  }
};
