import test from "ava";
import {
  findElement, createElement, setAttributes, setStyles,
} from "../../../src/js/utils/dom";
import sequencer from "../../../src/js/utils/sequencer";

const span = sequencer.run(
  [createElement, "span"],
  [setAttributes, { className: "content" }],
  [setStyles, { color: "#f00" }],
);
document.body.appendChild(span);

test("findElement(ELEMENT)", (t) => {
  const findTarget = findElement(span, document);

  t.is(findTarget.nodeName, "SPAN");
});

test("findElement(SELECTOR)", (t) => {
  const findTarget = findElement(".content", document);

  t.is(findTarget.nodeName, "SPAN");
});
