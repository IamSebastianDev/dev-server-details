/** @format */

import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

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
	plugins: [nodeResolve()],
};
