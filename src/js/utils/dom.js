import { assertType } from "./assertType";
import { compareType } from "./type";

/**
 *
 * @param {Element} el
 * @param {Object} newStyles
 * @description element 스타일을 정의.
 * @example
 *  setStyle(document.querySelector(SELECTOR), { color: '#fff' });
 * @return void
 */
export const setStyles = (el, newStyles) => {
  assertType(el, "el", "element");
  assertType(newStyles, "newStyles", "object");

  const styles = el.style;

  for (const prop in newStyles) {
    if (newStyles.hasOwnProperty(prop)) {
      styles[prop] = newStyles[prop];
    }
  }
};

/**
 *
 * @param {Element} el
 * @param {Object} newAttr
 * @description element 속성을 정의.
 * @example
 *  setAttributes(document.querySelector(SELECTOR), { className: 'boo' });
 * @return void
 */
export const setAttributes = (el, newAttr) => {
  assertType(el, "el", "element");
  assertType(newAttr, "newAttr", "object");

  for (const prop in newAttr) {
    if (newAttr.hasOwnProperty(prop)) {
      el[prop] = newAttr[prop];
    }
  }
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
 * @param {Object} data
 * @param {Functions} ...fns
 * @description dom helper 함수들을 sequencing하는 함수
 * @example
 *  const createDomSequence = domSequence({ tagName, styles, attrs });
 *  const element = createDomSequence(createElement, setStyles, setElements);
 * @return Element
 */
export const domSequence = (data) => (...fns) => {
  // assertType(data, "data", "object");

  const length = fns.length;

  return fns.reduce(
    (acc, fn, index) => {
      if (!compareType(fn, "function")) {
        return acc;
      }

      const paramsInfo = _getParamsForMethod(acc, fn.name);

      if (compareType(paramsInfo, "undefined")) {
        return acc;
      }

      const { returnKey, params } = paramsInfo;
      const result = fn(...params);

      if (returnKey !== "void" && !acc.hasOwnProperty(returnKey)) {
        acc[returnKey] = result;
      }

      if (length === index + 1) {
        return acc.el;
      }

      return acc;
    },
    { ...data },
  );
};

const _getParamsForMethod = (data, fnName) => {
  assertType(data, "data", "object");

  switch (fnName) {
    case "setStyles":
      return {
        params: [data.el, data.styles],
        returnKey: "void",
      };
    case "setAttributes":
      return {
        params: [data.el, data.attributes],
        returnKey: "void",
      };
    case "createElement":
      return {
        params: [data.tagName],
        returnKey: "el",
      };
    // case "sequence":
    //   return {
    //     params: [data],
    //     returnKey: "me",
    //   };
    default:
      return undefined;
  }
};
