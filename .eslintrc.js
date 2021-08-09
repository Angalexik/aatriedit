module.exports = {
	'env': {
		'node': true,
		'browser': true,
		'es6': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended'
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 11,
		'sourceType': 'module'
	},
	'plugins': [
		'@typescript-eslint',
		'svelte3'
	],
	'settings': {
		'svelte3/typescript': () => require('typescript'), // pass the TypeScript package to the Svelte plugin
	},
	'overrides': [ // this stays the same
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3'
		}
	],

	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'no-unused-vars': [
			'warn',
			'all'
		],
		'eqeqeq': [
			'error',
			'smart'
		],
		'no-debugger': 'off',
	}
};
