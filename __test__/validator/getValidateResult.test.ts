import test from "ava";
import Validation from "../../src/validation/";

test("Setting number check validation", (t) => {
  const validation = new Validation();
  const numberValidationInfo = {
    name: "number",
    matcher: function(v) {
      return /^[0-9]$/g;
    },
    errorMsg: "Not number",
  };

  validation.createNode(numberValidationInfo);

  const findNumberValidationNode = validation.getNode("number");

  t.is(findNumberValidationNode.name, "number", "Value of name is number");
  t.is(typeof findNumberValidationNode.matcher, "function", "Value of matcher type is function");
  t.is(findNumberValidationNode.errorMsg, "Not number", 'Value of errorMsg is "Not number"');
});
