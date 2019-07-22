import { ValidationNode, IValidationNode } from "./validationNode";

export interface IValidation {
  nodes: object;
  createNode(nodeInfo: object): boolean;
  updateNode(name: string, nodeInfo: object): this;
  removeNode(name: string): IValidationNode | undefined;
  getNode(name: string): IValidationNode | undefined;
}

const _findNode = (nodes: object, name: string) => {
  return nodes[name];
};
export default class Validator implements IValidation {
  nodes = {};

  createNode({ name, matcher, errorMsg }) {
    if (!!_findNode(this.nodes, name)) {
      return false;
    }

    this.nodes[name] = new ValidationNode(name, matcher, errorMsg);

    return true;
  }

  updateNode(name: string, { name: newName, matcher, errorMsg }) {
    const node = _findNode(this.nodes, name);

    if (!node) {
      return this;
    }

    newName && (node.name = newName);
    matcher && (node.matcher = matcher);
    errorMsg && (node.errorMsg = errorMsg);

    return this;
  }

  removeNode(name: string) {
    const node = _findNode(this.nodes, name);

    if (!node) {
      return;
    }

    delete this.nodes[name];

    return node;
  }

  getNode(name: string) {
    const node = _findNode(this.nodes, name);

    if (!node) {
      return;
    }

    return node;
  }
}
