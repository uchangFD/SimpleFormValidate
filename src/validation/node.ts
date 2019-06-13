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

  protected getValidatedResult(isValid: boolean): IValidatedResult {
    if (isValid) {
      return {
        isValid,
      };
    }
    return { isValid, errorMsg: this.errorMsg };
  }

  abstract validate(value: any): boolean | Promise<boolean>;
  abstract result(value: any): IValidatedResult | Promise<object>;
}

export class ValidationNode extends AbstractValidationNode {
  validate(value) {
    const matcher = this.matcher;

    if (typeof matcher === "function") {
      return matcher(value);
    } else {
      return matcher.test(value);
    }
  }

  result(value) {
    return this.getValidatedResult(this.validate(value));
  }
}

export class ValidationNodeAsync extends AbstractValidationNode {
  validate(value) {
    return new Promise<boolean>((resolve, reject) => {
      try {
        this.matcher(value, resolve);
      } catch (e) {
        reject(e);
      }
    });
  }

  async result(value) {
    try {
      return this.getValidatedResult(await this.validate(value));
    } catch (e) {
      throw new Error(e);
    }
  }
}
