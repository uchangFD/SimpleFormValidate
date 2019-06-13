let before;
let after;

const getHooks = () => {
  return {
    beforeEach: undefined,
    afterEach: undefined,
  }
}

export default {
  hook,
  createHook: () => hook();
}
