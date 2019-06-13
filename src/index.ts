import { ValidationNode, ValidationNodeAsync } from "./validation/node";

// import Validation from "./validation/validation";

// const _validation = new Validation();
// _validation.createNode({
//   name: "isNumber",
//   matcher: /^[0-9]$/g,
//   errorMsg: "not number",
// });

window.asyncV = new ValidationNodeAsync(
  "isNumber",
  (value: number, resolve) => {
    setTimeout(() => {
      resolve(/^[0-9]$/g.test(value + ""));
    }, 3000);
  },
  "no number",
);
window.V = new ValidationNode("isNumber", /^[0-9]$/g, "no number");

window.ValidationNode = ValidationNode;
