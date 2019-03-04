import test from "ava";
import sequencer from "../../../src/js/utils/sequencer";

const a = (num) => num + 1;
const b = (num) => num + 2;
const c = (num) => num + 3;
const d = (num) => num + 4;

test("run([a, 1], b, c, d) => 11", (t) => {
  const result = sequencer.run([a, 1], b, c, d);

  t.is(result, 11);
});
