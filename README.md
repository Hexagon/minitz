# minitz

[![Node.js CI](https://github.com/Hexagon/minitz/actions/workflows/node.js.yml/badge.svg)](https://github.com/Hexagon/minitz/actions/workflows/node.js.yml) [![Deno CI](https://github.com/Hexagon/minitz/actions/workflows/deno.yml/badge.svg)](https://github.com/Hexagon/minitz/actions/workflows/deno.yml)
[![npm version](https://badge.fury.io/js/minitz.svg)](https://badge.fury.io/js/minitz) [![NPM Downloads](https://img.shields.io/npm/dm/minitz.svg)](https://www.npmjs.org/package/minitz) [![jsdelivr](https://data.jsdelivr.com/v1/package/gh/hexagon/minitz/badge?style=rounded)](https://www.jsdelivr.com/package/gh/hexagon/minitz) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/4978bdbf495941c087ecb32b120f28ff)](https://www.codacy.com/gh/Hexagon/minitz/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Hexagon/minitz&amp;utm_campaign=Badge_Grade)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Hexagon/minitz/blob/main/LICENSE)

## Features

*   Convert dates between any timezone supported by the system.
*   Parses ISO8601 time strings.
*   MIT licensed, use the library any way you want. For real.
*   Minimal, no dependencies. Relies on JavaScript Intl and current best practices.
*   Works in Node.js >=14.0 (both require and import).
*   Works in Deno >=1.8.
*   Works in browsers as standalone, UMD or ES-module.
*   Includes [TypeScript](https://www.typescriptlang.org/) typings.

Try it live on [jsfiddle](https://jsfiddle.net/hexag0n/3mheu5by/)

## Usage

Converting a Date object to another timezone in JavaScript is possible using the Intl feature of vanilla JS.

```javascript
// Get current time in Asia/Tokyo, using vanilla js
new Date().toLocaleString("sv-SE", { timeZone: "Asia/Tokyo" });
// -> 2022-09-15 17:23:45
```

However - if you want to convert date/time _from_ another timezone, or convert between different timezones, things get trickier.

Minitz is a minimal library built to solve the problem in the simplest possible way, and made to work in all environments (Node/Deno/Browser, ESM/UMD/CommonJS).

Simple examples of conversion from a remote timezone, and a conversion between different timezones.

```javascript
// Get local time from time in Asia/Tokyo, using minitz and vanilla js
const localTime = minitz(2022,9,15,23,0,0,"Asia/Tokyo")
console.log( localTime.toLocaleString("sv-SE") );
// -> 2022-09-15 16:00:00
```

```javascript
// Get time in America/New_York from time in Asia/Tokyo, using minitz and vanilla js
// Also demonstrates that it's possible to use ISO8601 strings as input to minitz, through `.fromTZISO`
const localTime = minitz.fromTZISO("2022-09-15 23:00:00","Asia/Tokyo");
console.log( localTime.toLocaleString("sv-SE", { timeZone: "America/New_York" }) );
// -> 2022-09-15 10:00:00
```

More examples are available further below, and the full documentation is available at [hexagon.github.io/minitz](https://hexagon.github.io/minitz/).

## Installation

### Node.js

```npm install minitz --save```

JavaScript

```javascript
// ESM Import ...
import minitz from "minitz";

// ... or CommonJS Require
const minitz = require("minitz");
```

TypeScript

*Note that only default export is available in Node.js TypeScript, as the commonjs module is used internally.*

```typescript
import minitz from "minitz";

// ...
```

### Deno

JavaScript

```javascript
import minitz from "https://deno.land/x/minitz@3.0.1/src/minitz.js";

// ...
```

TypeScript

```typescript
import { minitz } from "https://deno.land/x/minitz@3.0.1/src/minitz.js";

// ...
```

Check [https://deno.land/x/minitz](https://deno.land/x/minitz) for latest available version

### Browser 

#### Manual

*   Download the latest [zipball](https://github.com/Hexagon/minitz/archive/refs/heads/main.zip)
*   Extract
*   Grab ```minitz.min.js``` (UMD and standalone) or ```minitz.min.mjs``` (ES-module) from the [dist/](/dist) folder

#### CDN

To use as an [UMD](https://github.com/umdjs/umd)-module (stand alone, [RequireJS](https://requirejs.org/) etc.)

```html
<script src="https://cdn.jsdelivr.net/npm/minitz/dist/minitz.min.js"></script>
```

To use as an [ES-module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

```html
<script type="module">
	import minitz from "https://cdn.jsdelivr.net/npm/minitz/dist/minitz.min.mjs";

	// ... see usage section ...
</script>
```

### More examples

The examples below will work only if you have imported minitz as described in the 'Installation' section.  If that's not the case the results may vary.

#### Convert a specific timezone to local time

Standard way

```javascript
// Convert 2022-09-10 23:08:09 in New York to local time (in this example Europe/Stockholm)
console.log("Local time: ", minitz(2022, 9, 10, 23, 8, 9, "America/New_York").toLocaleString("sv-SE"));
// Local time:  2022-09-11 05:08:09
```

Providing an ISO8601 timestring

```javascript
// Convert 2022-09-10 23:08:09 in New York to local time (in this example Europe/Stockholm)
console.log("Local time: ", minitz("2022-09-10 23:08:99", "America/New_York").toLocaleString("sv-SE"));
// Local time:  2022-09-11 05:08:09
```

#### Convert local time to a specific timezone

Provided that you only need to display the result, converting local time to specific timezone is best achieved with vanilla JavaScript.

```javascript
console.log("Time in New York printed with system locale: ", new Date().toLocaleString("sv-SE", { timeZone: "America/New_York"}));
// -> Time in New York printed with system locale:  2022-09-14 17:29:42
```

If you need to use the result in any other way, it's better to use minitz to convert to a remote timezone. This way you'll get the results as an object, which also includes the timezone to which the time is converted to.

```javascript
//  Convert to local time to time in America/New_York
//  As time in other timezones than local cannot be represented correctly by a date object
//  a generic object is returned
console.log("Time in New York: ", minitz.toTZ(new Date(), "America/New_York"));
// -> Time in New York:
//  {
//     year: 2022,
//     month: 9,
//     day: 14,
//     hour: 17,
//     minute: 29,
//     second: 42,
//     timezone: 'America/New_York'
//  }
```

## Contributing

Any contributions are welcome. See [Contribution Guide](/CONTRIBUTING.md)

## License

MIT
