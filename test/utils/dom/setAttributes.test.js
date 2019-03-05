import test from "ava";
import { setAttributes } from "../../../src/js/utils/dom";

test("setAttributes 함수 정의시 엘리먼트에 적용되었는가?", (t) => {
  const el = document.createElement("span");
  const testValue = "error-msg";

  setAttributes({ className: testValue }, el);

  t.is(el.className, testValue);
});
