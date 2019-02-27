import { assertType } from "../utils/assertType";
import {
  setStyles, setAttributes, createElement, domSequence,
} from "../utils/dom";

class State {
  constructor() {
    this.errorMsgs = [];
    this.errorMsgTemplate;
    this.targetsToAppendErrorMsg = [];
  }

  setErrorMsgTemplate(tagName, attributes, styles) {
    const createDomSequence = domSequence({ tagName, attributes, styles });

    this.errorMsgTemplate = createDomSequence(createElement, setStyles, setAttributes);
    console.log(this.errorMsgTemplate);
    console.dir(this.errorMsgTemplate);
  }
}

export default State;
