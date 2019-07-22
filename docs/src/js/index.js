import simpleFormValidator from "./simpleFormValidator";

simpleFormValidator.setType("email", ["email", "required"]);
simpleFormValidator.setType("password", ["password", "required"]);
simpleFormValidator.setType("password-confirm", ["password", "confirmPassword", "required"]);

const submitBtn = document.querySelector(".submit-btn");

submitBtn.addEventListener("click", () => {
  const result = simpleFormValidator.validate();
  let errorMsg = "";

  console.log(result);
  for (const { name, results, isValid } of result) {
    if (!isValid) {
      const message = results.find(({ isValid }) => !isValid).message;
      errorMsg += `${name}: ${message} \n`;
    }
  }

  if (!errorMsg) {
    errorMsg = "Submit!!";
  }

  alert(errorMsg);
});
