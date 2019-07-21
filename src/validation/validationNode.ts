interface INode {
  _name: string;
  _matcher: Function | RegExp;
  _errorMsg: string;
  matcher: Function | RegExp;
  name: string;
  errorMsg: string;
  validate(value: any): object;
}

export interface IValidationNode {
  new (name: string, matcher: Function | RegExp, errorMsg: string): INode;
}

export class ValidationNode implements INode {
  _name;
  _matcher;
  _errorMsg;

  constructor(name: string, matcher: Function | RegExp, errorMsg: string) {
    this.name = name;
    this.matcher = matcher;
    this.errorMsg = errorMsg;
  }

  get matcher() {
    return this._matcher;
  }
  set matcher(matcher) {
    this._matcher = matcher;
  }

  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
  }

  get errorMsg() {
    return this._errorMsg;
  }
  set errorMsg(errorMsg) {
    this._errorMsg = errorMsg;
  }

  validate(value) {
    const result = {
      isValid: true,
      message: "",
    };

    if (typeof this._matcher === "function") {
      result.isValid = this._matcher(value);
    } else {
      result.isValid = this._matcher.test(value);
    }

    if (!result.isValid) {
      return {
        ...result,
        message: this.errorMsg,
      };
    }

    return result;
  }
}
