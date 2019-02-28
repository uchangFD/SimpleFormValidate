import test from "ava";
import {
  findElement,
  createElement,
  domSequence,
  setAttributes,
  setStyles,
} from "../../../src/js/utils/dom";

const span = domSequence({
  tagName: "span",
  styles: { color: "rgb(255, 255, 0)" },
  attributes: { className: "content" },
})(createElement, setAttributes, setStyles);

document.body.appendChild(span);

test("findElement(ELEMENT)", (t) => {
  const findTarget = findElement(span, document);

  t.is(findTarget.nodeName, "SPAN");
});

test("findElement(SELECTOR)", (t) => {
  const findTarget = findElement(".content", document);

  t.is(findTarget.nodeName, "SPAN");
});
