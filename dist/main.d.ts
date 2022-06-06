export var __esModule: boolean;
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
export const colours: {
    pallete: Function;
    reset: string;
    modify: {
        bold: string;
        dim: string;
        italic: string;
        underscore: string;
        blink: string;
        reverse: string;
        hidden: string;
        strikethrough: string;
    };
    text: {
        black: string;
        red: string;
        green: string;
        yellow: string;
        blue: string;
        magenta: string;
        cyan: string;
        white: string;
    };
    block: {
        black: string;
        red: string;
        green: string;
        yellow: string;
        blue: string;
        magenta: string;
        cyan: string;
        white: string;
    };
};
/**
 * @param { Object } param0 - the object passed to the function to configure it's behaviour.
 * @param { number | string } param0.PORT - the Port number passed to the function.
 * @param { Object } [param0.userTheme] - the theme for the console. Should be an object containing the color properties
 * needed for the theme.
 * @param { Boolean } [param0.isSecure] - a boolean indicating if the dev server has a secure connection or not. Defaults
 * to false.
 * @param { Object } [param0.userText] - an object containing properties to supply custom text to the function.
 *
 * @description function to print information of a started dev server to the console. The information include the local * & internal address of the started server as well as the environment flag.
 *
 * @returns { void }
 */
export function presentDetails({ PORT, userTheme, isSecure, userText }: {
    PORT: number | string;
    userTheme?: any;
    isSecure?: boolean;
    userText?: any;
}): void;
export var themes: Readonly<{
    __proto__: any;
    Default: {
        heading: string[];
        main: string[];
        text: string[];
        notice: string[];
    };
    minimal: {
        heading: string[];
        main: string[];
        text: string[];
        notice: string[];
    };
    spring: {
        heading: string[];
        main: string[];
        text: string[];
    };
    summer: {
        heading: string[];
        main: string[];
        text: string[];
    };
    autumn: {
        heading: string[];
        main: string[];
        text: string[];
    };
    winter: {
        heading: string[];
        main: string[];
        text: string[];
    };
}>;
