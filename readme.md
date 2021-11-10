# Dev-Server-Details

A small library to provide information of your development setup inside the console.

![A picture as Example of the output](https://github.com/IamSebastianDev/dev-server-details/blob/master/readme-exampleimage.png)

> Note: This is the default theme with the the 'Gruvbox Material Dark' VS-Code theme.

## Installing

You can install the library via ```npm```:

```bash
npm i dev-server-details
```

## Overview

The `presentDetails` method will log your current enviroment, your localaddress, the ip address and the hostname to the console. You can configure the theme as well as the actual text of the message using the inbuilt configuration API.

## Usage

Import the ```presentDetails``` method into your main.js file.

```js
import { presentDetails } from "dev-server-details";

// when creating your https server, you can pass in the 
// presentDetails method as the callback 
// and pass the choosen Port to it
// The example below does this with a simple express server, 
// but any kind of HTTP Server will work.

import Express from "express"
const App = Express(); 

const PORT = process.env.PORT || 31415;

// create the server, and pass the presentDetail method as callback.

App.listen(PORT, presentDetails({ PORT }))
```

Once your file runs and the server is created, you should see the details logged to your console.

## API Reference

The following section describes all objects and methods exported by `dev-server-details`, the most important one being the `presentDetails` method, which is used to genereate the Detailed report.

### `presentDetails()`

The `presentDetails` method takes a single object as argument. The object is used to pass the PORT to the method as well as customize theming and the textoutput. It's properties are:

property name|type| description
-----------  |:---------------------------:|-------------
PORT | Number | The PORT number passed to the method that is used by your webserver.
isSecure | boolean | A boolean indicating if your connection to the server is secure via https.
userTheme | object | A object that can be used to change colors and look of the logged details.
userText   | object | A object that can be used to change the text output of the logged details.

> Note: The PORT property is all uppercase per convention, as unchangable constants should be all uppercase.

The Method's output will be logged to the console and contain the type of enviroment, as well as the local, ipv4 and hostname address of your server. The enviroment will default to "Development" unless `process.env.production` is set to true.  

### `colours {}`

The `colours` object contains the escape codes to style the output of the console. This can be used to create a custom Theme. A reference to all codes and their property names is below:

property name|code| description
-----------  |:------------:|-------------
reset | '\x1b[0m' | the code used to reset all previous styles
modify.bold | '\x1b[1m' | makes the text bold
modify.dim| '\x1b[2m' | makes the text shaded or 'dim'
modify.italic| '\x1b[3m' | enables cursive text
modify.underscore| '\x1b[4m' | enables underscored text
modify.reverse| '\x1b[7m' | inverts the color
modify.hidden| '\x1b[8m' | makes the text invisible
modify.strikethrough| '\x1b[9m' | enables striked through text
text.black| '\x1b[30m' | colours the text black
text.red| '\x1b[31m'| colours the text red
text.green| '\x1b[32m'| colours the text green
text.yellow| '\x1b[33m'| colours the text yellow
text.blue| '\x1b[34m'| colours the text blue
text.magenta| '\x1b[35m'| colours the text magenta
text.cyan| '\x1b[36m'| colours the text cyan
text.white| '\x1b[37m'| colours the text white
block.black| '\x1b[40m' | colours the background black
block.red| '\x1b[41m'| colours the background red
block.green| '\x1b[42m'| colours the background green
block.yellow| '\x1b[43m'| colours the background yellow
block.blue| '\x1b[44m'| colours the background blue
block.magenta| '\x1b[45m'| colours the background magenta
block.cyan| '\x1b[46m'| colours the background cyan
block.white| '\x1b[47m'| colours the background white

### `themes {}`

The `themes` object contains the default theme as well as a collection of different themes inspired by the seasons. You can use these predefined themes to style your output.

theme name|property name| description
-----------  |:------------:|-------------
Default theme | themes.Default | The default theme that is used if nothing is changed.
Spring  | themes.spring | A fresh and lively theme with greens and brigt colours.
Summer | themes.summer | A bright and warm theme that looks like watermelon
Autumn | themes.autumn | A theme with muted and warm colours.
Winter | themes.winter | A theme with bright and cold colours.

You can pass a prebuilt or custom theme like below:

```js
import { presentDetails, themes } from "dev-server-details";

// this will use the spring theme for the output
App.listen(PORT, presentDetails({ PORT, userTheme: themes.spring}))

```

## Theming

Instead of relying on a prebuilt theme, you can create your own theme. To do this, you simply create a theme object and pass it to the `presentDetails` method as the `userTheme` property.

The `theme` object can contain four different properties that will style different sections of the output.

property name| description
-----------  |------------
heading | This is the first line of the output, which will by default print 'Dev-Server-Details'
main | The second line of the output will by default describe the Enviroment.
text | This section of the output contains the all the detailed information.
notice | A notice is printed as the last line of the output.

Ommitting one of the properties is fine, in that case the default style will be used as a fallback.

## Texting

You can also change the text of the output via the `userText` property of the `presentDetails` method. Certain values are exposed to the text and can be included using a double curly braces syntax. You can see the default text as an example below.

```js
// the object containing the default text

const defaultText = {
  heading: 'Dev-Server-Details:',
  main: `{{enviroment}} Enviroment served to:`,
  text: [
    'Local:    {{local}}',
    'On your network:  {{ip}}',
    'Or via hostname:  {{hostname}}',
  ],
  notice: 'To follow the links, double-click or [Cmd]-click on MacOs.',
};

```

> Note: The text property **has** to be an array, even if it only contains one string.

The properties used to describe the different text elements are `heading`, `main`, `text` & `notice`. Ommitting one of the properties is fine, the method will use the default text as fallback. To enable printing values inside the strings, see the list of exposed values below:

value name| description
-----------  |------------
enviroment |Will be either "Development" or "Production", depending on which flag is set.
ip | The ipV4 address.
local | The localhost address.
hostname | The hostname adress.
port | the PORT number that was assigned to the method.

You can use these values with the curly braces syntax demonstrated above.

## License

Watcherbot is licensed under the [MIT License](https://opensource.org/licenses/MIT)
