import ValidationNode from "./validationNode";
import assertType from "../utils/assertType";

class Validation {
  nodes = [];

  createNode(info) {
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
      throw new Error(`Cannot found ${name} node`);
    }

    node.setState(info);
  }
  setMatcher(name, isAsync = false) {
    assertType(name, "string");
  }
  getNode(name) {
    assertType(name, "string");

    return this._findNode(name);
  }

  _findNode(name) {
    return this.nodes.find((node) => node.getName() === name);
  }
}

export default Validation;
