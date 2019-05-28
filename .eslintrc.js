module.exports = {
  extends: "airbnb",
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ["plugin:prettier/recommended"],
  rules: {},
};
