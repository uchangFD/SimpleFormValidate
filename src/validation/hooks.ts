export default class Hook {
  static _before: Function;
  static _after: Function;
  private _beforeEach: Function;
  private _afterEach: Function;

  set beforeEach(fn: Function) {
    this._beforeEach = fn;
  }
  get beforeEach(): Function {
    return this._beforeEach;
  }
  set afterEach(fn: Function) {
    this._afterEach = fn;
  }
  get afterEach(): Function {
    return this._afterEach;
  }
}
