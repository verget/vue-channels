module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: [
    'vue'
  ],
  extends: [
    '@vue/standard',
    'plugin:vue/recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: ['error', 'single'],
    'vue/html-self-closing': ['error', {
      'html': {
        'void': 'any',
        'normal': 'never',
        'component': 'any'
      }
    }],
    'vue/singleline-html-element-content-newline': 'off',
    'space-before-function-paren': ['error', 'always'],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 3,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ]
  }
}
