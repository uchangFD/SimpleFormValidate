import { ValidationNode, ValidationNodeAsync } from "./validation/_validationNode";

// import Validation from "./validation/validation";

// const _validation = new Validation();
// _validation.createNode({
//   name: "isNumber",
//   matcher: /^[0-9]$/g,
//   errorMsg: "not number",
// });

window.ValidationNode = ValidationNode;
window.ValidationNodeAsync = ValidationNodeAsync;
