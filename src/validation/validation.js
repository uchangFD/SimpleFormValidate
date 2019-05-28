import ValidationNode from "./validationNode";
import assertType from "../utils/assertType";

class Validation {
  nodes = {};

  getNode(name) {
    assertType(name, "string");

    return this.nodes[name];
  }
  createNode(info) {
    assertType(info, "object");

    const propertiesThatMustExist = {
      matcher: (value) => assertType(value, ["function", "regexp"]),
      errorMsg: (value) => assertType(value, "string"),
      name: (value) => assertType(value, "string"),
    };
    const propertyListOfInfo = Object.entries(info);

    for (let [key, value] of propertyListOfInfo) {
      const assertPropertyType = propertiesThatMustExist[key];

      if (typeof assertPropertyType === "undefined") {
        throw new Error(`${key} is not property that will assert`);
      }

      assertPropertyType(value);
    }

    if (this.nodes[info.name]) {
      throw new Error(`Aleady exist ${info.name} node`);
    }
    // TODO: 빈 validationNode를 만들 것인가 말것인가?😩
    this.nodes[info.name] = new ValidationNode(info);
  }
  removeNode(name) {
    assertType(name, "string");

    this.nodes[name] && delete this.nodes[name];
  }
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
  setMatcher(name, isAsync = false) {
    // TODO: Promise로 감싸는 부분은 체크할 때 하는걸로😁
    assertType(name, "string");
  }
}

export default Validation;
