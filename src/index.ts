import Validation from "./validation/";
import FormValidation from "./form";

if (window && !window.Validation) {
  window.Validation = Validation;
  window.FormValidation = FormValidation;
}
