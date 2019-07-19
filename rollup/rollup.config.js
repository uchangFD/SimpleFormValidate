import babel from "rollup-plugin-babel";
import typescript from "rollup-plugin-typescript";
import visualizer from "rollup-plugin-visualizer";
import paths from "./paths";

import production from "./rollup.config.prod";
import development from "./rollup.config.dev";
import docs from "./rollup.config.docs";

const defaults = {
  input: paths.src,
  output: {
    file: paths.dist,
    format: "iife",
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
    typescript({
      lib: ["es5", "es6", "dom"],
      target: "es5",
    }),
    visualizer(),
  ],
};

let config;

if (process.env.BUILD === "production") {
  config = Object.assign(defaults, production);
} else if (process.env.BUILD === "development") {
  const defaultOpts = Object.assign(defaults, development);
  config = [defaultOpts, docs];
} else {
  throw new Error(`Env property is not defined: ${process.env}`);
}

export default config;
