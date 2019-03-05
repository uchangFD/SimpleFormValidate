import { assertType } from "./assertType";
import { compareType, getType } from "./type";

/**
 *
 * @param {Element} el
 * @param {Object} newStyles
 * @description element 스타일을 정의.
 * @example
 *  setStyle(document.querySelector(SELECTOR), { color: '#fff' });
 * @return Element
 */
export const setStyles = (newStyles, el) => {
  assertType(el, "el", "element");
  assertType(newStyles, "newStyles", "object");

  const styles = el.style;

  for (const prop in newStyles) {
    if (newStyles.hasOwnProperty(prop)) {
      styles[prop] = newStyles[prop];
    }
  }

  return el;
};

/**
 *
 * @param {Element} el
 * @param {Object} newAttr
 * @description element 속성을 정의.
 * @example
 *  setAttributes(document.querySelector(SELECTOR), { className: 'boo' });
 * @return Element
 */
export const setAttributes = (newAttr, el) => {
  assertType(el, "el", "element");
  assertType(newAttr, "newAttr", "object");

  for (const prop in newAttr) {
    if (newAttr.hasOwnProperty(prop)) {
      el[prop] = newAttr[prop];
    }
  }

  return el;
};

/**
 *
 * @param {String} tagName
 * @description element를 생성 및 반환
 * @example
 *  createElement('span') => ELEMENT
 * @return ELEMENT
 */
export const createElement = (tagName) => {
  assertType(tagName, "tagName", "string");

  return document.createElement(tagName);
};

/**
 *
 * @param {String|Element} target
 * @param {String|Element} parent
 * @description element 찾기
 * @example
 *  findElement(SELECTOR, [SELECTOR|ELEMENT]);
 * @return [ELEMENT, undefined]
 */
export const findElement = (target, parent = document) => {
  assertType(target, "target", ["string", "element"]);

  if (getType(target).indexOf("element") > -1) {
    return target;
  }

  target = parent.querySelector(target);

  if (typeof target === "undefined") {
    return;
  }

  return target;
};
