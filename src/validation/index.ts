import { ValidationNode, ValidationNodeAsync, AbstractValidationNode, IMatcher } from "./node";

interface INodeStateTypes {
  name?: string | undefined;
  matcher?: IMatcher | undefined;
  errorMsg?: string | undefined;
  isAsync?: boolean;
}
export default class Validation {
  private nodes: object = {};

  createNode({ name, matcher, errorMsg, isAsync = false }: INodeStateTypes): boolean {
    if (!!this._findNode(name)) {
      throw new Error(`Already exist node: ${name}`);
    }

    if (!isAsync) {
      this.nodes[name] = new ValidationNode(name, matcher, errorMsg);
    } else {
      this.nodes[name] = new ValidationNodeAsync(name, matcher, errorMsg);
    }

    return true;
  }

  updateNode(name: string, { name: _name, matcher, errorMsg }: INodeStateTypes = {}): this {
    const node = this._findNode(name);

    if (!node) {
      throw new Error(`${name} is not exist`);
    }

    _name && (node.name = _name);
    matcher && (node.matcher = matcher);
    errorMsg && (node.errorMsg = errorMsg);

    return this;
  }

  removeNode(name: string): AbstractValidationNode {
    const node = this._findNode(name);

    if (!node) {
      throw new Error(`${name} is not exist`);
    }

    delete this.nodes[name];

    return node;
  }

  getNode(name: string): AbstractValidationNode | undefined {
    const node = this._findNode(name);

    if (!node) {
      throw new Error(`${name} is not exist`);
    }

    return node;
  }

  private _findNode(name: string): AbstractValidationNode | undefined {
    return this.nodes[name];
  }
}
