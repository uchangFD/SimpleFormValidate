import validationNode from "./validationNode";
import assertType from "../utils/assertType";

class Validation {
  nodes;
  /**
   * @description get node
   * @param {String} - name
   */
  getNode(name) {
    this.nodes = {};
    assertType(name, "string");

    return this.nodes[name];
  }
  /**
   * @description create node
   * @param {Object} - info
   */

  createNode(info) {
    assertType(info, "object");

    if (!info.hasOwnProperty("name") || !info.hasOwnProperty("errorMsg") || !info.hasOwnProperty("matcher")) {
      throw new Error(`Must need name, errorMsg, name, matcher property`);
    }

    const propertiesThatMustExist = {
      matcher: (value) => assertType(value, ["function", "regexp"]),
      errorMsg: (value) => assertType(value, "string"),
      name: (value) => assertType(value, "string"),
    };

    for (const [key, value] of Object.entries(info)) {
      const assertPropertyValue = propertiesThatMustExist[key];

      assertPropertyValue && assertPropertyValue(value);
    }

    if (this.nodes[info.name]) {
      throw new Error(`Aleady exist ${info.name} node`);
    }

    this.nodes[info.name] = new ValidationNode(info);
  }
  /**
   * @description remove node
   * @param {String} - name
   */
  removeNode(name) {
    assertType(name, "string");

    this.nodes[name] && delete this.nodes[name];
  }
  /**
   * @description update node
   * @param {String} - name
   * @param {Object} - nodeInfo
   */
  updateNode(name, nodeInfo) {
    assertType(name, "string");
    nodeInfo && assertType(nodeInfo, "object");

    const node = this.nodes[name];

    if (!node) {
      // TODO: return할 것인가 예외처리 할 것인가?😩
      throw new Error(`Cannot found ${name} node`);
    }

    node.setState(nodeInfo);
  }
  /**
   * @description set Matcher
   * @param {String} - name
   * @param {Boolean} - isAsync
   */
  setMatcher(name, isAsync = false) {
    // TODO: Promise로 감싸는 부분은 체크할 때 하는걸로😁
    assertType(name, "string");
  }
}

export default Validation;
