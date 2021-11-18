/** @format */

// import the internal dependencies from node
import { hostname, networkInterfaces } from 'os';

// import the colours object
import { colours } from './colours.js';
import * as themes from './themes.js';

const defaultText = {
	heading: `[{{time}}] {{dir}}${colours.reset} 🤖`,
	main: `{{enviroment}} Enviroment served to:`,
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

	const { eth0, en0 } = networkInterfaces();

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

	const adapter = eth0 ? eth0 : en0;

	/**
	 * @property { string } address
	 * @private
	 * @description the address property is the extracted IP4 string from the found network addapter and is what will
	 * be returned by the method.
	 */

	const { address } = adapter.find((address) => address.family === 'IPv4');

	return { error: false, string: address };
};

/**
 * @param { Object } param0 - the object passed to the function to configure it's behaviour.
 * @param { Number } param0.PORT - the Portnumber passed to the function.
 * @param { {} } param0.userTheme - the theme for the console. Should be an object containing the color properties
 * needed for the theme.
 * @param { Boolean } param0.isSecure - a boolean indicating if the dev server has a secure connection or not. Defaults
 * to false.
 * @param { {} } param0.userText - an object containing properties to supply custom text to the function.
 *
 * @description function to print information of a started dev server to the console. The information include the local * & internal adress of the started server as well as the enviroment flag.
 *
 * @returns { {
 * 	theme: object,
 * 	localIP: string,
 * 	localHostname: string,
 * 	enviroment: string
 * } } an object containing details
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
	 * @description the enviroment is set to "Production" if a production env variable exists, otherwise it will
	 * default to Development
	 */

	const enviroment = process.env.production ? 'Production' : 'Development';

	/**
	 * @type { {} }
	 * @private
	 * @description the theme used to style the console output that is created by merging the default and user supplied * theme. If the theme passed by the user is complete, it will completely override the default theme, otherwise
	 * defaults will be applied where properties are missing in the userTheme
	 */

	const theme = {
		...themes.Default,
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
	 * @description the text object mereges the default and user supplied text into each other to provide a complete
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
				enviroment,
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
		string: localIP.error ? localIP.address : hostname(),
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

	return {
		theme,
		localIP: localIP.string,
		localHostname: localHostname.string,
		enviroment,
	};
};

export { presentDetails, colours, themes };
