import test from "ava";
import { createElement } from "../../../src/js/utils/dom";
import { getType } from "../../../src/js/utils/type";

test("createElement 함수 정의시 엘리먼트가 생성되고 기대했던 엘리먼트가 생성되었는가.", (t) => {
  const el = createElement("span");

  t.is(getType(el).indexOf("element") > -1, true);
  t.is(el.nodeName.toLowerCase(), "span");
});
