/**
 *
 * @param {ALL} target
 * @description 타겟의 타입을 반환.
 * @example getType('string') => string
 * @return String
 */
export const getType = (target) =>
  Object.prototype.toString
    .call(target)
    .slice(8, -1)
    .toLowerCase();

/**
 *
 * @param {ALL} target
 * @param {String} type
 * @description 타겟의 타입이 type과 같은지 비교
 * @example compareType([], 'array') => true
 * @return Boolean
 */
export const compareType = (target, type) => getType(target) === type;
