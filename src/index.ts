import Validation from "./validation/";

const validation = (window.validation = new Validation());

validation.createNode({
  name: "numberAsync",
  matcher: (value, resolve) => {
    setTimeout(() => {
      resolve(/^[0-9]$/.test(value + ""));
    }, 3000);
  },
  errorMsg: "no number",
  isAsync: true,
});

validation.createNode({
  name: "numberSync",
  matcher: /[0-9]$/g,
  errorMsg: "no number",
});

async function testAsync() {
  const result = await validation.getNode("numberAsync").result("???");

  console.log("async result: ", result);
}

function testSync() {
  // validation.removeNode("numberSync");
  const node = validation.getNode("numberSync");
  // validation.updateNode("numberSync", { errorMsg: "no~~~~~~~~~~~~~~~~" });
  const result = node.result("hi");

  console.log("sync result: ", result);
}

// testAsync();
// testSync();
