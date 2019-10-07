module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-console': ["error", { allow: ["warn", "error"] }],
    'max-len': ["error", { "code": 140 }],
    'import/prefer-default-export': 'off',
    'object-curly-newline': 'off',
    "object-shorthand": ["error", "always"],
    'arrow-body-style': 'off',
  },
};
