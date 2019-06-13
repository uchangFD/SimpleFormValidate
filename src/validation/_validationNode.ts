interface IMatcher {
  matcher: Function | RegExp;
}
interface IValidatedResult {
  errorMsg?: string;
  isValid: boolean;
}

export abstract class AbstractValidationNode {
  private _name: string;
  private _matcher: IMatcher;
  private _errorMsg: string;

  constructor(name: string, matcher: IMatcher, errorMsg: string) {
    this.name = name;
    this.matcher = matcher;
    this.errorMsg = errorMsg;
  }

  get matcher(): IMatcher {
    return this._matcher;
  }
  set matcher(matcher: IMatcher) {
    this._matcher = matcher;
  }

  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

  get errorMsg(): string {
    return this._errorMsg;
  }
  set errorMsg(errorMsg: string) {
    this._errorMsg = errorMsg;
  }

  abstract validate(value: any): any;
}

export class ValidationNode extends AbstractValidationNode {
  validate(value: any) {
    const matcher = this.matcher;
    let isValid: boolean;
    let result: IValidatedResult;

    if (typeof matcher === "function") {
      isValid = matcher(value);
    } else {
      isValid = matcher.test(value);
    }

    result = {
      isValid,
    };

    if (!isValid) {
      result["errorMsg"] = this.errorMsg;
    }

    return result;
  }
}

export class ValidationNodeAsync extends AbstractValidationNode {
  validate(value: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const matcher = this.matcher;
        let isValid: boolean;
        let result: IValidatedResult;

        if (typeof matcher === "function") {
          isValid = await matcher(value);
        } else {
          isValid = matcher.test(value);
        }

        result = {
          isValid,
        };

        if (!isValid) {
          result["errorMsg"] = this.errorMsg;
        }

        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }
}
