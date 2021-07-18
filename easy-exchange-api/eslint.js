module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true
    },
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'tsconfigRootDir': __dirname,
        'project': 'tsconfig.json',
        'sourceType': 'module',
    },
    'extends': [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
        '../client/eslint-shared-settings/eslint-common.js'
    ],
    'plugins': [
        '@typescript-eslint',
    ],
    'ignorePatterns': ['**/*.js'],
    'rules': {
        '@typescript-eslint/interface-name-prefix': 'off'
    }
}
