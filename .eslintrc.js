module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    'no-alert': 2,
    'no-console': 2,
    'no-debugger': 2,
    'no-useless-escape': 1,
    'no-with': 2,
    'vars-on-top': 1,
    'wrap-iife': 1,
    'radix': 2,
    'eqeqeq': 2,
    'accessor-pairs': 1,
    'array-bracket-spacing': 1,
    'block-scoped-var': 2,
    'curly': 1,
    'default-case': 2,
    'dot-notation': 2,
    'brace-style': 1,
    'comma-dangle': 2,
    'computed-property-spacing': 1,
    'indent': [1, 2, { 'SwitchCase': 1 }],
    'block-spacing': 1,
    'new-cap': 0,
    'dot-location': ['error', 'property'],
    'comma-style': ['error', 'last'],
    'semi': ['error', 'always'],

    'camelcase': [
      'error', {
        'properties': 'never'
      }
    ],

    'one-var': [
      'error',
      'never'
    ],

    'max-len': [
      'error', {
        'code': 90,
        'ignoreTemplateLiterals': true,
        'ignoreUrls': true,
        'ignorePattern': 'import .* from \'.*\';'
      }
    ],

    'operator-linebreak': [
      'error',

      'after', {
        'overrides': {
          '+': 'before'
        }
      }
    ],

    'object-shorthand': [
      'error',

      'always', {
        'avoidQuotes': true
      }
    ],

    'ember/avoid-leaking-state-in-ember-objects': 'off'
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js',
        'server/**/*.js'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here

        // this can be removed once the following is fixed
        // https://github.com/mysticatea/eslint-plugin-node/issues/77
        'node/no-unpublished-require': 'off'
      })
    }
  ]
};
