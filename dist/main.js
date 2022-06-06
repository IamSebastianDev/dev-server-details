'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var os = require('os');

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

const colours = {
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

/** @format */

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

var themes = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Default: Default,
	minimal: minimal,
	spring: spring,
	summer: summer,
	autumn: autumn,
	winter: winter
});

/** @format */

const defaultText = {
	heading: `[{{time}}] {{dir}}${colours.reset} 🤖`,
	main: `{{environment}} Environment served to:`,
	text: [
		'Local:		{{local}}',
		'On your network:	{{ip}}',
		'Or via hostname:	{{hostname}}',
	],
	notice: 'To follow the links, double-click or [Cmd]-click on MacOs.',
};

/**
 * @description utility method the extract the most likely local ip from the networkInterfaces object.
 *
 * @returns { String } the found local IP4
 */

const getLocalIP = () => {
	/**
	 * To get the local IP, we first look for a 'en0' or 'eth0' property on the networkInterfaces object
	 */

	const { eth0, en0 } = os.networkInterfaces();

	// check if at least one of the properties is not undefined.

	if (eth0 === undefined && en0 === undefined) {
		console.warn(`DSD: No local Network Interface could be found.`);
		return { error: true, address: `No network address exposed.` };
	}

	/**
	 * @property { [] } adapter
	 * @private
	 * @description the adapter is the network interface that has been found by the networkInterfaces() method.
	 * It returns the not undefined adapter.
	 */

	const adapter = eth0 || en0;

	/**
	 * @property { string } address
	 * @private
	 * @description the address property is the extracted IP4 string from the found network adapter and is what will
	 * be returned by the method. Node 18.0 introduced a breaking change in the networkInterfaces method, in which the
	 * returned adapter object's family property is now a number instead of a string.
	 */

	const { address } = adapter.find(
		(address) => address.family === 'IPv4' || address.family === 4
	);

	return { error: false, string: address };
};

/**
 * @param { Object } param0 - the object passed to the function to configure it's behaviour.
 * @param { Number } param0.PORT - the Port number passed to the function.
 * @param { {}? } param0.userTheme - the theme for the console. Should be an object containing the color properties
 * needed for the theme.
 * @param { Boolean? } param0.isSecure - a boolean indicating if the dev server has a secure connection or not. Defaults
 * to false.
 * @param { {}? } param0.userText - an object containing properties to supply custom text to the function.
 *
 * @description function to print information of a started dev server to the console. The information include the local * & internal address of the started server as well as the environment flag.
 *
 * @returns { void }
 */

const presentDetails = ({ PORT, userTheme, isSecure = false, userText }) => {
	// check if PORT is of type number and exists. A PORT property should always be passed to the method.

	if (PORT === undefined || PORT === NaN) {
		throw new TypeError(
			`${PORT} is not a Number. Expected a value of type Number for 'PORT'.`
		);
	}

	/**
	 * @type { String }
	 * @private
	 * @description the environment is set to "Production" if a production env variable exists, otherwise it will
	 * default to Development
	 */

	const environment =
		process.env.NODE_ENV === 'production' ? 'Production' : 'Development';

	/**
	 * @type { {} }
	 * @private
	 * @description the theme used to style the console output that is created by merging the default and user supplied * theme. If the theme passed by the user is complete, it will completely override the default theme, otherwise
	 * defaults will be applied where properties are missing in the userTheme
	 */

	const theme = {
		...Default,
		...userTheme,

		/**
		 * @type { function }
		 * @description utility method to return all escape sequences contained as string or array as a single string
		 * to the user.
		 *
		 * @param { string } prop - the name of the property to return
		 * @returns { string } the created escape sequence string
		 */

		get(prop) {
			return Array.isArray(this[prop]) ? this[prop].join('') : this[prop];
		},
	};

	/**
	 * @type { {} }
	 * @private
	 * @description the text object merges the default and user supplied text into each other to provide a complete
	 * text object.
	 */

	const text = {
		...defaultText,
		...userText,

		/**
		 * @description a utility method to parse a string and replace variables with values
		 *
		 * @param { string } prop - the string to parse
		 *
		 * @returns { string } the parsed string
		 */

		get(prop, index = undefined) {
			// the variables are declared so that the regex replacer can access them

			const vars = {
				environment: environment,
				local: composeAddress({ error: false, string: 'localhost' }),
				ip: composeAddress(localIP),
				hostname: composeAddress(localHostname),
				port: PORT,
				cwd: process.cwd(),
				dir: process.cwd().split('/').pop(),
				time: new Date().toLocaleTimeString(),
			};

			const toParse =
				index === undefined ? this[prop] : this[prop][index];

			return toParse.replace(
				/\{{2}[^\{\}]*\}{2}/gim,
				(match) => vars[match.replace('{{', '').replace('}}', '')]
			);
		},
	};

	/**
	 * @type { Object }
	 * @private
	 * @description the ipv4 address of the system
	 */

	const localIP = getLocalIP();

	/**
	 * @type { Object }
	 * @private
	 * @description the hostname of the system
	 */

	const localHostname = {
		error: localIP.error,
		string: localIP.error ? localIP.address : os.hostname(),
	};

	/**
	 * @description the composeAddress method is used to create a complete address string
	 *
	 * @param { string } addressString - variable part of the address
	 *
	 * @returns { string } the composed string consisting of the http or https prefix, plus the address string and the
	 * Port
	 */

	const composeAddress = (address) => {
		if (!address.error) {
			return `http${isSecure ? 's' : ''}://${address.string}:${
				colours.modify.bold
			}${PORT}`;
		}

		return 'No network address exposed.';
	};

	/**
	 *
	 * @description utility method to compose a string by applying it's theme, the text and the reset at the end of the
	 * line
	 *
	 * @param { string } prop - the name of the line to compose
	 * @returns { string } the composed string
	 */

	const composeLine = (prop) =>
		`${theme.get(prop)}${text.get(prop)}${colours.reset}`;

	/**
	 * @description utility method to compose the address section out of the provided string fragments
	 *
	 * @returns { string } the composed string
	 */

	const buildAddressSection = () => {
		return text.text
			.map((line, index) => {
				return `  ${theme.get('text')}${text.get('text', index)}${
					colours.reset
				}`;
			})
			.join('\n');
	};

	// log the strings to the console

	console.log(`
${composeLine('heading')}
${composeLine('main')}

${buildAddressSection()}

${composeLine('notice')}
`);
};

exports.colours = colours;
exports.presentDetails = presentDetails;
exports.themes = themes;
