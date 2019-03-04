import { assertType } from "../../utils/assertType";

class ErrorMsgState {
  constructor() {
    this.errorMsgs = [];
    this.errorMsgTemplate = this._defaultTemplate();
    this.targetsToAppendErrorMsg = [];
  }

  get getErrorMsgTemplate() {
    return this.errorMsgTemplate;
  }
  set setErrorMsgTemplate(el) {
    this.errorMsgTemplate = el;
  }

  get getErrorMsgs() {
    return this.errorMsgs;
  }
  set addErrorMsg(errorMsg) {
    this.errorMsgs.push(errorMsg);
  }

  get getTargetsToAppendErrorMsg() {
    return this.targetsToAppendErrorMsg;
  }
  set addTargetsToAppendErrorMsg(appendTargetInfo) {
    this.targetsToAppendErrorMsg.push(appendTargetInfo);
  }
}

export default ErrorMsgState;
