import paths from "./paths";
import babel from "rollup-plugin-babel";

export default {
  input: paths.docs.src,
  output: {
    file: paths.docs.dist,
    format: "iife",
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
  ],
};
