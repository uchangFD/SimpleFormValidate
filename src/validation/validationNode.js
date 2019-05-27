class ValidationNode {
  constructor(info) {
    // info validation

    this.isAsync = false;
    this.matcher;
    this.errorMsg;
    this.name;
  }

  checkValue(value) {
    // return result[Object];
  }
  setMatcher(matcher) {
    // void
  }
  getMatcher() {
    // return matcher
  }
  setName(name) {
    // void
  }
  getName() {
    // return name
  }
}
