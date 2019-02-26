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
export const aseertType = (target, name, validationTypes) => {
  const type = getType(target);

  if (!Array.isArray(validationTypes)) {
    validationTypes = [validationTypes];
  }

  if (validationTypes.indexOf(type) === -1) throw Error(`${target} is not the expected ${validationTypes}.`);
};
