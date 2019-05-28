/**
 * get type of target
 * @param {any} target
 **/

export default (target) =>
  Object.prototype.toString
    .call(target)
    .slice(8, -1)
    .toLowerCase();
