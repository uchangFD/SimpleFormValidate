import Validation from "./validation/";
import FormValidation from "./dom";

if (window && !window.Validator) {
  window.Validator = {
    Validation,
    FormValidation,
  };
}
