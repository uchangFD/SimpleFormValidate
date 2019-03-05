const sequencer = {};

sequencer.run = (...fns) => {
  let _fns = Array.from(fns);
  let result;

  _fns.forEach((runner, index) => {
    result = _getResult(runner);
    _fns[index + 1] = _mergeData(_fns[index + 1], result);
  });

  return result;
};

sequencer.chain = (data) => (...fns) => {
  fns[0] = _mergeData(fns[0], data);
  return sequencer.run(...fns);
};

const _mergeData = (target, result) => {
  if (typeof target === "function") {
    return [target, result];
  }

  if (typeof target === "object" && target.length > 0) {
    return [...target, result];
  }

  return target;
};

const _getResult = (runner) => {
  if (typeof runner === "function") {
    return runner();
  }

  if (typeof runner === "object" && runner.length > 0) {
    const _sequencer = runner.shift();
    const _data = runner;
    return _sequencer(..._data);
  }
};

export default sequencer;
