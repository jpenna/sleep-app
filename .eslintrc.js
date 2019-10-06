module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'graphql'
  ],
  rules: {
    'graphql/named-operations': 'error',
    'graphql/capitalized-type-name': 'error',
    'graphql/no-deprecated-fields': 'error',
    'graphql/template-strings': ['error', {
      env: 'apollo',
      tagName: 'gql',
    }],
  },
};
