import babel from 'rollup-plugin-babel';
import paths from './paths';

import production from './rollup.config.prod';
import development from './rollup.config.dev';

const defaults = {
  input: paths.src,
  output: {
    file: paths.dist,
    format: 'iife',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};

let mergeOpts;

if (process.env.BUILD === 'production') {
  mergeOpts = Object.assign(defaults, production);
} else if (process.env.BUILD === 'development') {
  mergeOpts = Object.assign(defaults, development);
} else {
  throw new Error(`Env property is not defined: ${process.env}`);
}

export default mergeOpts;