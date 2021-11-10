/** @format */

import { colours } from './colours.js';

/**
 * @type { {
 * heading: string[],
 * main: string[],
 * text: string[],
 * notice: string[]
 * } }
 * @description - the default theme for the console
 */

const Default = {
	heading: [
		colours.modify.bold,
		colours.text.white,
		colours.modify.dim,
		colours.modify.underscore,
	],
	main: [colours.modify.bold, colours.text.yellow],
	text: [colours.text.cyan],
	notice: [colours.modify.dim],
};

/**
 * @type { {
 * heading: string[],
 * main: string[],
 * text: string[],
 * notice: string[]
 * } }
 * @description - the default theme for the console
 */

const minimal = {
	heading: [colours.modify.hidden],
	main: [],
	text: [colours.text.blue],
	notice: [colours.modify.hidden],
};

/**
 * @type { {
 * heading: string[],
 * main: string[],
 * text: string[],
 * } }
 * @description - a theme inspired by spring, with green and lively colours
 */

const spring = {
	heading: [colours.text.green, colours.modify.dim],
	main: [colours.text.green],
	text: [colours.text.magenta],
};

/**
 * @type { {
 * heading: string[],
 * main: string[],
 * text: string[],
 * } }
 * @description - a theme inspired by summeer, looks like a watermelon.
 */

const summer = {
	heading: [colours.text.green, colours.modify.underscore],
	main: [colours.text.green, colours.modify.bold],
	text: [colours.text.red],
};

/**
 * @type { {
 * heading: string[],
 * main: string[],
 * text: string[],
 * } }
 * @description - a theme inspired by autumn, with warm muted colours
 */

const autumn = {
	heading: [
		colours.text.magenta,
		colours.modify.dim,
		colours.modify.underscore,
	],
	main: [colours.text.magenta],
	text: [colours.text.yellow, colours.modify.dim],
};

/**
 * @type { {
 * heading: string[],
 * main: string[],
 * text: string[],
 * } }
 * @description - a theme inspired by winter, with cold and bright colours
 */

const winter = {
	heading: [colours.text.white, colours.modify.dim],
	main: [colours.text.white, colours.modify.underscore],
	text: [colours.text.blue],
};

export { Default, minimal, spring, summer, autumn, winter };
