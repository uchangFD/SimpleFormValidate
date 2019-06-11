(function () {
  'use strict';

  /**
   * get type of target
   * @param {any} target
   **/

  var getType = (target) =>
    Object.prototype.toString
      .call(target)
      .slice(8, -1)
      .toLowerCase();

  var assertType = (target, expect) => {
    const expectType = getType(expect);

    if (expectType !== "array" && expectType !== "string") {
      throw new Error(`${expect} is not string or array type`);
    }

    if (expectType === "array") {
      expect.forEach((e) => {
        if (getType(e) !== "string") {
          throw new Error(`${e} is not string`);
        }
      });
    }

    const targetType = getType(target);
    let result;

    if (expectType === "array") {
      result = expect.some((e) => targetType === e);
    } else {
      result = targetType === expect;
    }

    if (!result) {
      throw new Error(`The target is different from the expected value. \n target type: ${target}, expect: ${expect}`);
    }
  };

  // TODO: Hook을 적용해야 하는데 어떻게하지?😕
  var ValidationNode = /** @class */ (function () {
      function ValidationNode(info) {
          this.state = {
              isAsync: false,
              matcher: undefined,
              errorMsg: "",
              name: "",
          };
          info && assertType(info, "object") && Object.assign(state, info);
      }
      /**
       * @description validate value with matcher
       * @param {any} - value
       */
      ValidationNode.prototype.validate = function (value) {
          var _a = this.state, matcher = _a.matcher, errorMsg = _a.errorMsg;
          var validatedResult;
          if (getType(matcher) === "function") {
              validatedResult = matcher(value);
          }
          else {
              validatedResult = matcher.test(value);
          }
          return {
              result: validatedResult,
              errorMsg: errorMsg,
          };
      };
      /**
       * @description set matcher
       * @param {Function | Regexp} - matcher
       */
      ValidationNode.prototype.setMatcher = function (matcher) {
          assertType(matcher, ["function", "regexp"]);
          this.state.matcher = matcher;
      };
      /**
       * @description get matcher
       * @returns matcher
       */
      ValidationNode.prototype.getMatcher = function () {
          return this.state.matcher;
      };
      /**
       * @description set Name
       * @param {String} - name
       */
      ValidationNode.prototype.setName = function (name) {
          assertType(name, "string");
          this.state.name = name;
      };
      /**
       * @description get matcher
       * @returns name
       */
      ValidationNode.prototype.getName = function () {
          return this.state.name;
      };
      /**
       * @description set errorMsg
       * @param {String} - name
       */
      ValidationNode.prototype.setErrorMsg = function (msg) {
          assertType(msg, "string");
          this.state.errorMsg = msg;
      };
      /**
       * @description get errorMsg
       * @returns errorMsg
       */
      ValidationNode.prototype.getErrorMsg = function () {
          return this.state.getErrorMsg;
      };
      /**
       * @description set state
       * @param {Object} - info
       */
      ValidationNode.prototype.setState = function (info) {
          if (!info) {
              return;
          }
          assertType(info, "object");
          Object.assign(this.state, info);
      };
      return ValidationNode;
  }());
  //# sourceMappingURL=validationNode.js.map

  var Validation = /** @class */ (function () {
      function Validation() {
          this.nodes = {};
      }
      /**
       * @description get node
       * @param {String} - name
       */
      Validation.prototype.getNode = function (name) {
          assertType(name, "string");
          return this.nodes[name];
      };
      /**
       * @description create node
       * @param {Object} - info
       */
      Validation.prototype.createNode = function (info) {
          assertType(info, "object");
          if (!info.hasOwnProperty("name") || !info.hasOwnProperty("errorMsg") || !info.hasOwnProperty("matcher")) {
              throw new Error("Must need name, errorMsg, name, matcher property");
          }
          var propertiesThatMustExist = {
              matcher: function (value) { return assertType(value, ["function", "regexp"]); },
              errorMsg: function (value) { return assertType(value, "string"); },
              name: function (value) { return assertType(value, "string"); },
          };
          for (var _i = 0, _a = Object.entries(info); _i < _a.length; _i++) {
              var _b = _a[_i], key = _b[0], value = _b[1];
              var assertPropertyValue = propertiesThatMustExist[key];
              assertPropertyValue && assertPropertyValue(value);
          }
          if (this.nodes[info.name]) {
              throw new Error("Aleady exist " + info.name + " node");
          }
          this.nodes[info.name] = new ValidationNode(info);
      };
      /**
       * @description remove node
       * @param {String} - name
       */
      Validation.prototype.removeNode = function (name) {
          assertType(name, "string");
          this.nodes[name] && delete this.nodes[name];
      };
      /**
       * @description update node
       * @param {String} - name
       * @param {Object} - nodeInfo
       */
      Validation.prototype.updateNode = function (name, nodeInfo) {
          assertType(name, "string");
          nodeInfo && assertType(nodeInfo, "object");
          var node = this.nodes[name];
          if (!node) {
              // TODO: return할 것인가 예외처리 할 것인가?😩
              throw new Error("Cannot found " + name + " node");
          }
          node.setState(nodeInfo);
      };
      /**
       * @description set Matcher
       * @param {String} - name
       * @param {Boolean} - isAsync
       */
      Validation.prototype.setMatcher = function (name, isAsync) {
          if (isAsync === void 0) { isAsync = false; }
          // TODO: Promise로 감싸는 부분은 체크할 때 하는걸로😁
          assertType(name, "string");
      };
      return Validation;
  }());
  //# sourceMappingURL=validation.js.map

  var validation = new Validation();
  validation.createNode({
      name: 'isNumber',
      matcher: /^[0-9]$/g,
      errorMsg: 'not number'
  });
  //# sourceMappingURL=index.js.map

}());
