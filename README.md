# minitz

Converting Date objects between different timezones in javascript is hard. This minimal library tries to solve that problem in the simplest possible way. You can convert dates to a specific timezone, and you can also convert dates **from** specific timezones.

[![Node.js CI](https://github.com/Hexagon/minitz/actions/workflows/node.js.yml/badge.svg)](https://github.com/Hexagon/minitz/actions/workflows/node.js.yml) [![Deno CI](https://github.com/Hexagon/minitz/actions/workflows/deno.yml/badge.svg)](https://github.com/Hexagon/minitz/actions/workflows/deno.yml) 
[![npm version](https://badge.fury.io/js/@hexagon%2Fminitz.svg)](https://badge.fury.io/js/@hexagon%2Fminitz) [![NPM Downloads](https://img.shields.io/npm/dm/minitz.svg)](https://www.npmjs.org/package/minitz) [![jsdelivr](https://data.jsdelivr.com/v1/package/npm/minitz/badge?style=rounded)](https://www.jsdelivr.com/package/npm/minitz) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/4978bdbf495941c087ecb32b120f28ff)](https://www.codacy.com/gh/Hexagon/minitz/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Hexagon/minitz&amp;utm_campaign=Badge_Grade)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Hexagon/minitz/blob/main/LICENSE) 

*   Convert Dates between timezones.
*   MIT licensed, use the library any way you want. For real.
*   Minimal, no dependencies. Relies on JavaScript Intl and current best practises.
*   Works in Node.js >=14.0 (both require and import).
*   Works in Deno >=1.8.
*   Works in browsers as standalone, UMD or ES-module.
*   Includes [TypeScript](https://www.typescriptlang.org/) typings.
*   **Important:** Currently in pre-release. Check back for version 1.0 later.

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
import minitz from "https://cdn.jsdelivr.net/gh/hexagon/minitz/src/minitz.js";

// ...
```

TypeScript

```typescript
import { minitz } from "https://cdn.jsdelivr.net/gh/hexagon/minitz/src/minitz.js";

// ...
```

### Browser 

#### Manual

*   Download latest [zipball](https://github.com/Hexagon/minitz/archive/refs/heads/main.zip)
*   Unpack
*   Grab ```minitz.min.js``` (UMD and standalone) or ```minitz.min.mjs``` (ES-module) from the [dist/](/dist) folder

#### CDN

To use as a [UMD](https://github.com/umdjs/umd)-module (stand alone, [RequireJS](https://requirejs.org/) etc.)

```html
<script src="https://cdn.jsdelivr.net/npm/minitz/dist/minitz.min.js"></script>
```

To use as a [ES-module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

```html
<script type="module">
	import minitz from "https://cdn.jsdelivr.net/npm/minitz/dist/minitz.min.mjs";

	// ... see usage section ...
</script>
```
## Documentation

Full documentation available at [hexagon.github.io/minitz](https://hexagon.github.io/minitz/).

### Examples

Assuming you have imported minitz as described under 'Installation'.

Convert local time to a specific timezone

```javascript
		
const 
    localTime = new Date(),
    timeInSantiago = minitz.toTZ(localTime, "America/Santiago");

console.log("Local time: ", localTime.toLocaleString('sv-SE'));
// Local time:  2022-09-08 00:08:09

console.log("Time in Santiago: ", timeInSantiago.toLocaleString('sv-SE'));
// Time in santiago: 2022-09-07 19:08:09


```

Convert from a specific timezone to local time

```javascript

const 
    timeInSantiago = new Date(Date.parse("2022-09-07 19:08:09")),
    localTime = minitz.fromTZ(timeInSantiago, "America/Santiago");

console.log("Time in Santiago: ", timeInSantiago.toLocaleString('sv-SE'));
// Time in santiago: 2022-09-07 19:08:09

console.log("Local time: ", localTime.toLocaleString('sv-SE'));
// Local time:  2022-09-08 00:08:09

```

## Contributing

See [Contribution Guide](/CONTRIBUTING.md)

## License

MIT
