import ValidationNode from "./validationNode";
import assertType from "../utils/assertType";

class Validation {
  nodes = [];

  getNode(name) {
    assertType(name, "string");

    return this._findNode(name);
  }
  createNode(info) {
    // TODO: 빈 validationNode를 만들 것인가 말것인가?😩
    this.nodes.push(new ValidationNode(info));
  }
  removeNode(name) {
    assertType(name, "string");

    this.nodes = nodes.filter((node) => node.getName() !== name);
  }
  updateNode(name, nodeInfo) {
    assertType(name, "string");
    nodeInfo && assertType(nodeInfo, "object");

    const node = this._findNode(name);

    if (!node) {
      // TODO: return할 것인가 예외처리 할 것인가?😩
      throw new Error(`Cannot found ${name} node`);
    }

    node.setState(info);
  }
  setMatcher(name, isAsync = false) {
    // TODO: Promise로 감싸는 부분은 체크할 때 하는걸로😁
    assertType(name, "string");
  }

  _findNode(name) {
    return this.nodes.find((node) => node.getName() === name);
  }
}

export default Validation;
