import Validation from "./validation/";

// import Validation from "./validation/validation";

// const _validation = new Validation();
// _validation.createNode({
//   name: "isNumber",
//   matcher: /^[0-9]$/g,
//   errorMsg: "not number",
// });

// window.asyncV = new ValidationNodeAsync(
//   "isNumber",
//   (value: number, resolve) => {
//     setTimeout(() => {
//       resolve(/^[0-9]$/.test(value + ""));
//     }, 3000);
//   },
//   "no number",
// );
// window.V = new ValidationNode("isNumber", /^[0-9]$/, "no number");

// window.ValidationNode = ValidationNode;

const validation = (window.validation = new Validation());

validation.createNode({
  name: "number",
  matcher: (value, resolve) => {
    setTimeout(() => {
      resolve(/^[0-9]$/.test(value + ""));
    }, 3000);
  },
  errorMsg: "no number",
  isAsync: true,
});

async function test() {
  const result = await validation.getNode("number").result("???");

  console.log(result);
}

test();
