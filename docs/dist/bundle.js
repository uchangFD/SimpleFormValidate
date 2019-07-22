(function () {
  'use strict';

  var simpleFormValidator = new window.SimpleFormValidator("#form");
  var validation = simpleFormValidator.validation;
  validation.create({
    name: "required",
    matcher: function matcher(v) {
      return !!v;
    },
    errorMsg: "필수 입력란입니다."
  });
  validation.create({
    name: "email",
    matcher: /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{2,5}$/,
    errorMsg: "이메일 형식이 아닙니다."
  });
  validation.create({
    name: "password",
    matcher: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,24}$/,
    errorMsg: "비밀번호 형식이 아닙니다."
  });
  validation.create({
    name: "confirmPassword",
    matcher: function matcher(v) {
      var passwordValue = document.querySelector('[name="password"]').value;
      return v === passwordValue;
    },
    errorMsg: "비밀번호가 다릅니다."
  });

  simpleFormValidator.setType("email", ["email", "required"]);
  simpleFormValidator.setType("password", ["password", "required"]);
  simpleFormValidator.setType("password-confirm", ["password", "confirmPassword", "required"]);
  var submitBtn = document.querySelector(".submit-btn");
  submitBtn.addEventListener("click", function () {
    var result = simpleFormValidator.validate();
    var errorMsg = "";
    console.log(result);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = result[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ref2 = _step.value;
        var name = _ref2.name,
            results = _ref2.results,
            isValid = _ref2.isValid;

        if (!isValid) {
          var message = results.find(function (_ref3) {
            var isValid = _ref3.isValid;
            return !isValid;
          }).message;
          errorMsg += "".concat(name, ": ").concat(message, " \n");
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (!errorMsg) {
      errorMsg = "Submit!!";
    }

    alert(errorMsg);
  });

}());
