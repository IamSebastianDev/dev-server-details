/** @format */

import { terser } from 'rollup-plugin-terser';

export default {
	input: 'src/main.js',
	output: [
		{
			file: './dist/main.js',
			format: 'cjs',
		},
		{
			file: './dist/main.min.mjs',
			format: 'es',
			plugins: [terser()],
		},
	],
};
