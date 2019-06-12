import Validation from "./validation/validation";

const _validation = new Validation();
_validation.createNode({
  name: "isNumber",
  matcher: /^[0-9]$/g,
  errorMsg: "not number",
});
