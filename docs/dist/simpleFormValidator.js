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
    //# sourceMappingURL=validationNode.js.map

    var _findNode = function (nodes, name) {
        return nodes[name];
    };
    var Validator = /** @class */ (function () {
        function Validator() {
            this.nodes = {};
        }
        Validator.prototype.createNode = function (_a) {
            var name = _a.name, matcher = _a.matcher, errorMsg = _a.errorMsg;
            if (!!_findNode(this.nodes, name)) {
                return false;
            }
            this.nodes[name] = new ValidationNode(name, matcher, errorMsg);
            return true;
        };
        Validator.prototype.updateNode = function (name, _a) {
            var newName = _a.name, matcher = _a.matcher, errorMsg = _a.errorMsg;
            var node = _findNode(this.nodes, name);
            if (!node) {
                return this;
            }
            newName && (node.name = newName);
            matcher && (node.matcher = matcher);
            errorMsg && (node.errorMsg = errorMsg);
            return this;
        };
        Validator.prototype.removeNode = function (name) {
            var node = _findNode(this.nodes, name);
            if (!node) {
                return;
            }
            delete this.nodes[name];
            return node;
        };
        Validator.prototype.getNode = function (name) {
            var node = _findNode(this.nodes, name);
            if (!node) {
                return;
            }
            return node;
        };
        return Validator;
    }());
    //# sourceMappingURL=validation.js.map

    //# sourceMappingURL=index.js.map

    var getValidationResults = function (name, validation, _a) {
        var el = _a.el, validationTypes = _a.validationTypes, after = _a.after;
        var value = el.value;
        var validationResults = validationTypes.reduce(function (acc, type) {
            var node = validation.get(type);
            if (node) {
                acc.push(node.validate(value));
            }
            return acc;
        }, []);
        return {
            name: name,
            isValid: validationResults.every(function (_a) {
                var isValid = _a.isValid;
                return isValid;
            }),
            results: validationResults,
            after: after,
        };
    };
    var Form = /** @class */ (function () {
        function Form(selector) {
            if (!selector) {
                throw new Error("You must assign selector");
            }
            this.validation = (function () {
                var _validation = new Validator();
                return {
                    create: function (info) {
                        _validation.createNode(info);
                    },
                    update: function (name, info) {
                        _validation.updateNode(name, info);
                    },
                    remove: function (name) {
                        return _validation.removeNode(name);
                    },
                    get: function (name) {
                        return _validation.getNode(name);
                    },
                };
            })();
            try {
                var formEl = void 0;
                if (typeof selector === "string") {
                    formEl = document.querySelector(selector);
                }
                else {
                    formEl = selector;
                }
                var willValidateNode = Array.from(formEl.querySelectorAll("[name]"));
                this.formData = willValidateNode.reduce(function (acc, el) {
                    var name = el.name;
                    acc[name] = {
                        el: el,
                        after: undefined,
                        validationTypes: [],
                    };
                    return acc;
                }, {});
            }
            catch (e) {
                throw new Error(e);
            }
        }
        Form.prototype.setType = function (name, types) {
            var validationInfo = this.formData[name];
            if (!validationInfo) {
                return;
            }
            var validationTypes = validationInfo.validationTypes;
            if (Array.isArray(types)) {
                types.forEach(function (type) {
                    validationTypes.splice(-1, 0, type);
                });
            }
            else {
                validationTypes.push(types);
            }
            return this;
        };
        Form.prototype.setAfter = function (name, after) {
            var validationInfo = this.formData[name];
            if (!validationInfo) {
                return;
            }
            validationInfo.after = after;
            return this;
        };
        Form.prototype.startAfter = function (validationResult) {
            if (Array.isArray(validationResult)) {
                validationResult.forEach(function (_a) {
                    var results = _a.results, after = _a.after;
                    if (typeof after === "function") {
                        after(results);
                    }
                });
            }
            return this;
        };
        Form.prototype.validate = function (name) {
            var _a = this, formData = _a.formData, validation = _a.validation;
            if (!name) {
                return Object.keys(formData).map(function (key) { return getValidationResults(key, validation, formData[key]); });
            }
            if (typeof name !== "string" && !formData[name]) {
                return;
            }
            return getValidationResults(name, validation, formData[name]);
        };
        return Form;
    }());

    if (typeof window === "object") {
        window.SimpleFormValidator = Form;
    }
    //# sourceMappingURL=index.js.map

}());
