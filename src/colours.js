/** @format */

/**
 * @type { {
 * 	pallete: function,
 * 	reset: string,
 * 	modify: {
 * 		bold: string,
 * 		dim: string,
 * 		italic: string
 * 		underscore: string,
 * 		blink: string,
 * 		reverse: string,
 * 		hidden: string
 * 		strikethrough: string
 *  },
 * 	text: {
 * 		black: string,
 * 		red: string,
 *		green: string,
 *		yellow: string,
 *		blue: string,
 *		magenta: string,
 *		cyan: string,
 *		white: string,
 * 	},
 * 	block: {
 * 		black: string,
 * 		red: string,
 *		green: string,
 *		yellow: string,
 *		blue: string,
 *		magenta: string,
 *		cyan: string,
 *		white: string,
 * 	},
 * } }
 *
 * @description an object containing the escape sequences for the text, background and modification sequences
 */

export const colours = {
	/**
	 * @public
	 * @description method to display the colours to the console to give an overview of the available colors
	 */

	pallete() {
		const char = `\u2588`;
		const drawLine = (colorName, colorCode) => {
			console.log(
				`${colorCode}${char}${char}${char}${char} ${colorName}`
			);
		};

		for (const colorName in this.text) {
			if (Object.hasOwnProperty.call(this.text, colorName)) {
				const colorCode = this.text[colorName];

				drawLine(colorName, colorCode);
			}
		}
	},
	/**
	 * @property { string }
	 * @description the reset sequence that resets the string to the normal console output. This is called at the end
	 * of every line.
	 */

	reset: '\x1b[0m',

	/**
	 * @property { {} }
	 * @description the modify property contains the escape sequences for modifying the text output
	 */

	modify: {
		bold: '\x1b[1m',
		dim: '\x1b[2m',
		italic: '\x1b[3m',
		underscore: '\x1b[4m',
		blink: '\x1b[5m',
		reverse: '\x1b[7m',
		hidden: '\x1b[8m',
		strikethrough: '\x1b[9m',
	},

	text: {
		black: '\x1b[30m',
		red: '\x1b[31m',
		green: '\x1b[32m',
		yellow: '\x1b[33m',
		blue: '\x1b[34m',
		magenta: '\x1b[35m',
		cyan: '\x1b[36m',
		white: '\x1b[37m',
	},
	block: {
		black: '\x1b[40m',
		red: '\x1b[41m',
		green: '\x1b[42m',
		yellow: '\x1b[43m',
		blue: '\x1b[44m',
		magenta: '\x1b[45m',
		cyan: '\x1b[46m',
		white: '\x1b[47m',
	},
};
