(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var AbstractValidationNode = /** @class */ (function () {
        function AbstractValidationNode(name, matcher, errorMsg) {
            this.name = name;
            this.matcher = matcher;
            this.errorMsg = errorMsg;
        }
        Object.defineProperty(AbstractValidationNode.prototype, "matcher", {
            get: function () {
                return this._matcher;
            },
            set: function (matcher) {
                this._matcher = matcher;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractValidationNode.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (name) {
                this._name = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractValidationNode.prototype, "errorMsg", {
            get: function () {
                return this._errorMsg;
            },
            set: function (errorMsg) {
                this._errorMsg = errorMsg;
            },
            enumerable: true,
            configurable: true
        });
        AbstractValidationNode.prototype.getValidatedResult = function (isValid) {
            if (isValid) {
                return {
                    isValid: isValid,
                };
            }
            return { isValid: isValid, errorMsg: this.errorMsg };
        };
        return AbstractValidationNode;
    }());
    var ValidationNode = /** @class */ (function (_super) {
        __extends(ValidationNode, _super);
        function ValidationNode() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ValidationNode.prototype.validate = function (value) {
            if (typeof this.matcher === "function") {
                return this.matcher(value);
            }
            else {
                return this.matcher.test(value);
            }
        };
        ValidationNode.prototype.result = function (value) {
            return this.getValidatedResult(this.validate(value));
        };
        return ValidationNode;
    }(AbstractValidationNode));
    var ValidationNodeAsync = /** @class */ (function (_super) {
        __extends(ValidationNodeAsync, _super);
        function ValidationNodeAsync() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ValidationNodeAsync.prototype.validate = function (value) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                try {
                    _this.matcher(value, resolve);
                }
                catch (e) {
                    reject(e);
                }
            });
        };
        ValidationNodeAsync.prototype.result = function (value) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, e_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            _a = this.getValidatedResult;
                            return [4 /*yield*/, this.validate(value)];
                        case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                        case 2:
                            e_1 = _b.sent();
                            throw new Error(e_1);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return ValidationNodeAsync;
    }(AbstractValidationNode));
    //# sourceMappingURL=node.js.map

    var Validation = /** @class */ (function () {
        function Validation() {
            this.nodes = {};
        }
        Validation.prototype.createNode = function (_a) {
            var name = _a.name, matcher = _a.matcher, errorMsg = _a.errorMsg, _b = _a.isAsync, isAsync = _b === void 0 ? false : _b;
            if (!!this.getNode(name)) {
                return false;
            }
            if (!isAsync) {
                this.nodes[name] = new ValidationNode(name, matcher, errorMsg);
            }
            else {
                this.nodes[name] = new ValidationNodeAsync(name, matcher, errorMsg);
            }
            return true;
        };
        Validation.prototype.updateNode = function (_a) {
            var name = _a.name, matcher = _a.matcher, errorMsg = _a.errorMsg;
            var node = this.getNode(name);
            if (!node) {
                return;
            }
            name && (node.name = name);
            matcher && (node.matcher = matcher);
            errorMsg && (node.errorMsg = errorMsg);
        };
        Validation.prototype.removeNode = function (name) {
            var node = this.nodes[name];
            delete this.nodes[name];
            return node;
        };
        Validation.prototype.getNode = function (name) {
            return this.nodes[name];
        };
        return Validation;
    }());
    //# sourceMappingURL=index.js.map

    // import Validation from "./validation/validation";
    // const _validation = new Validation();
    // _validation.createNode({
    //   name: "isNumber",
    //   matcher: /^[0-9]$/g,
    //   errorMsg: "not number",
    // });
    // window.asyncV = new ValidationNodeAsync(
    //   "isNumber",
    //   (value: number, resolve) => {
    //     setTimeout(() => {
    //       resolve(/^[0-9]$/.test(value + ""));
    //     }, 3000);
    //   },
    //   "no number",
    // );
    // window.V = new ValidationNode("isNumber", /^[0-9]$/, "no number");
    // window.ValidationNode = ValidationNode;
    var validation = (window.validation = new Validation());
    validation.createNode({
        name: "number",
        matcher: function (value, resolve) {
            setTimeout(function () {
                resolve(/^[0-9]$/.test(value + ""));
            }, 3000);
        },
        errorMsg: "no number",
        isAsync: true,
    });
    function test() {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, validation.getNode("number").result("???")];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/];
                }
            });
        });
    }
    test();
    //# sourceMappingURL=index.js.map

}());
