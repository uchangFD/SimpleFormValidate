import test from "ava";
import ErrorMsg from "../../src/js/FormValidator/ErrorMsg";
import { createElement } from "../../src/js/utils/dom";

const states = new ErrorMsg();

test("state._defaultTemplate() 결과가 일치하는가", (t) => {
  const el = states._defaultTemplate();
  const nodeName = el.nodeName.toLowerCase();
  const className = el.className;

  t.is(nodeName, "span");
  t.is(className, "error-msg");
});

test("state.setErrorMsgTemplate() 결과가 일치하는가", (t) => {
  const color = "rgb(255, 255, 0)";
  const className = "new-error-msg";

  states.setErrorMsgTemplate("span", { className }, { color });

  const el = states.errorMsgTemplate;
  const styles = window.getComputedStyle(el);

  t.is(styles.getPropertyValue("color"), color);
  t.is(el.className, className);
});

test("state.setTargetToAppendErrorMsg() 결과가 일치하는가", (t) => {
  const parentEl = createElement("div");

  states.setTargetToAppendErrorMsg("email", parentEl);

  const targetsToAppendErrorMsg = states.targetsToAppendErrorMsg;

  t.is(targetsToAppendErrorMsg.length > 0, true);
  t.is(targetsToAppendErrorMsg.some((info) => info.name === "email"), true);
  t.is(targetsToAppendErrorMsg.some((info) => info.parent.nodeName === "DIV"), true);
});

test("state.setErrorMsgs() 결과가 일치하는가", (t) => {
  const arr = [1, 2, 3, 4];

  t.notThrows(() => {
    states.setErrorMsgs(arr);
  });
  t.is(states.errorMsgs.length, 4);
});
