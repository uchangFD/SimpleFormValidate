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
    if (!!this.getNode(name)) {
      return false;
    }

    if (!isAsync) {
      this.nodes[name] = new ValidationNode(name, matcher, errorMsg);
    } else {
      this.nodes[name] = new ValidationNodeAsync(name, matcher, errorMsg);
    }

    return true;
  }

  updateNode({ name, matcher, errorMsg }: INodeStateTypes): void {
    const node = this.getNode(name);

    if (!node) {
      return;
    }

    name && (node.name = name);
    matcher && (node.matcher = matcher);
    errorMsg && (node.errorMsg = errorMsg);
  }

  removeNode(name: string): AbstractValidationNode {
    const node = this.nodes[name];

    delete this.nodes[name];

    return node;
  }

  getNode(name: string): AbstractValidationNode | undefined {
    return this.nodes[name];
  }
}
