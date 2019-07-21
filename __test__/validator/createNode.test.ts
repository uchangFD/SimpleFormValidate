import test from "ava";
import Validation from "../../src/validation/";

test("create validation", (t) => {
  const validation = new Validation();

  t.is(validation.constructor.name, "_Validation");
});
