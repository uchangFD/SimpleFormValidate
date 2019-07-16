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

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var ValidationNode = /** @class */ (function () {
        function ValidationNode(name, matcher, errorMsg) {
            this.name = name;
            this.matcher = matcher;
            this.errorMsg = errorMsg;
        }
        Object.defineProperty(ValidationNode.prototype, "matcher", {
            get: function () {
                return this._matcher;
            },
            set: function (matcher) {
                this._matcher = matcher;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ValidationNode.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (name) {
                this._name = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ValidationNode.prototype, "errorMsg", {
            get: function () {
                return this._errorMsg;
            },
            set: function (errorMsg) {
                this._errorMsg = errorMsg;
            },
            enumerable: true,
            configurable: true
        });
        ValidationNode.prototype.validate = function (value) {
            var result = {
                isValid: true,
                message: "",
            };
            if (typeof this._matcher === "function") {
                result.isValid = this._matcher(value);
            }
            else {
                result.isValid = this._matcher.test(value);
            }
            if (!result.isValid) {
                return __assign({}, result, { message: this.errorMsg });
            }
            return result;
        };
        return ValidationNode;
    }());
    //# sourceMappingURL=node.js.map

    var _findNode = function (nodes, name) {
        return nodes[name];
    };
    var Validation = /** @class */ (function () {
        function Validation() {
            this.nodes = {};
        }
        Validation.prototype.createNode = function (_a) {
            var name = _a.name, matcher = _a.matcher, errorMsg = _a.errorMsg;
            if (!!_findNode(this.nodes, name)) {
                throw new Error("Already exist node: " + name);
            }
            this.nodes[name] = new ValidationNode(name, matcher, errorMsg);
            return true;
        };
        Validation.prototype.updateNode = function (name, _a) {
            var newName = _a.name, matcher = _a.matcher, errorMsg = _a.errorMsg;
            var node = _findNode(this.nodes, name);
            if (!node) {
                throw new Error(name + " is not exist");
            }
            newName && (node.name = newName);
            matcher && (node.matcher = matcher);
            errorMsg && (node.errorMsg = errorMsg);
            return this;
        };
        Validation.prototype.removeNode = function (name) {
            var node = _findNode(this.nodes, name);
            if (!node) {
                return;
            }
            delete this.nodes[name];
            return node;
        };
        Validation.prototype.getNode = function (name) {
            var node = _findNode(this.nodes, name);
            if (!node) {
                return;
            }
            return node;
        };
        return Validation;
    }());
    //# sourceMappingURL=index.js.map

    var Form = /** @class */ (function () {
        function Form() {
        }
        return Form;
    }());
    //# sourceMappingURL=index.js.map

    if (window && !window.Validator) {
        window.Validator = {
            Validation: Validation,
            FormValidation: Form,
        };
    }
    //# sourceMappingURL=index.js.map

}());
