import path from 'path';

export default {
  src: path.resolve(__dirname, '../src/index.ts'),
  dist: path.resolve(__dirname, '../dist/bundle.js'),
  docs: {
    src: path.resolve(__dirname, '../docs/src/js/index.js'),
    dist: path.resolve(__dirname, '../docs/dist/bundle.js')
  }
};

