export const getType = (target) =>
  Object.prototype.toString
    .call(target)
    .slice(8, -1)
    .toLowerCase();

export const compareType = (target, type) => getType(target) === type;

/**
 * @param {any} val
 * @param {string} name
 * @param {string|string[]} expects
 */
export function assertType(val, name, expects) {
  const type = getType(val);
  if (!Array.isArray(expects)) expects = [expects];
  if (expects.includes(type)) return;
  throw new TypeError(`"${name}"은 "${expects.join(',')}"이어야 합니다. (현재 ${type})`);
}
