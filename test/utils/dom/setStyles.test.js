import test from "ava";
import { setStyles } from "../../../src/js/utils/dom";

test("setStyles 함수 정의시 엘리먼트에 적용되었는가?", (t) => {
  const el = document.createElement("span");
  const testValue = "rgb(255, 255, 0)";

  setStyles(el, { color: testValue });

  const styles = window.getComputedStyle(el);

  t.is(styles.getPropertyValue("color"), testValue);
});
