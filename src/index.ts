import Validation from "./validation/";
import FormValidation from "./dom";

if (window && !window.Validation) {
  window.Validation = Validation;
}
