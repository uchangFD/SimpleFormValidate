import test from "ava";
import getType from "../../src/utils/getType";

test("[]를 넣었을 때 array가 반환되는가", (t) => {
  t.is(getType([]), "array");
});
