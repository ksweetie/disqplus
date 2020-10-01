module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "plugin:fp/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["fp", "react-hooks", "@typescript-eslint", "import"],
  rules: {
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-empty-function": "off",
    yoda: "off",
    "react/prop-types": "off",
    "import/first": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "no-dupe-class-members": "off",
    "fp/no-nil": "off",
    "fp/no-unused-expression": "off",
    "fp/no-rest-parameters": "off",
    "fp/no-mutation": ["error", { exceptions: [{ object: "draft" }] }],
    "fp/no-mutating-methods": ["error", { allowedObjects: ["draft"] }],
    "max-lines": ["error", 200],
    "max-nested-callbacks": ["error", 2],
    "max-depth": ["error", 3],
    "react-hooks/rules-of-hooks": "error",
    "import/no-named-as-default": "off",
    "import/order": ["error", { "newlines-between": "always" }],
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {},
    },
  },
  overrides: [
    {
      files: ["*.spec.*"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "fp/no-mutation": "off",
        "fp/no-let": "off",
        "max-nested-callbacks": "off",
      },
    },
  ],
};
