# minitz

Description ToDo

[![Node.js CI](https://github.com/Hexagon/minitz/actions/workflows/node.js.yml/badge.svg)](https://github.com/Hexagon/minitz/actions/workflows/node.js.yml) [![Deno CI](https://github.com/Hexagon/minitz/actions/workflows/deno.yml/badge.svg)](https://github.com/Hexagon/minitz/actions/workflows/deno.yml) 
[![npm version](https://badge.fury.io/js/@hexagon%2Fminitz.svg)](https://badge.fury.io/js/@hexagon%2Fminitz) [![NPM Downloads](https://img.shields.io/npm/dm/minitz.svg)](https://www.npmjs.org/package/minitz) [![jsdelivr](https://data.jsdelivr.com/v1/package/npm/minitz/badge?style=rounded)](https://www.jsdelivr.com/package/npm/minitz) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/4978bdbf495941c087ecb32b120f28ff)](https://www.codacy.com/gh/Hexagon/minitz/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Hexagon/minitz&amp;utm_campaign=Badge_Grade)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Hexagon/minitz/blob/main/LICENSE) 

*   Features
*   Works in Node.js >=4.0 (both require and import).
*   Works in Deno >=1.16.
*   Works in browsers as standalone, UMD or ES-module.
*   Includes [TypeScript](https://www.typescriptlang.org/) typings.

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
import minitz from "https://cdn.jsdelivr.net/gh/hexagon/minitz@1/src/minitz.js";

// ...
```

TypeScript

```typescript
import { minitz } from "https://cdn.jsdelivr.net/gh/hexagon/minitz@1/src/minitz.js";

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
<script src="https://cdn.jsdelivr.net/npm/minitz@1/dist/minitz.min.js"></script>
```

To use as a [ES-module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

```html
<script type="module">
	import minitz from "https://cdn.jsdelivr.net/npm/minitz@1/dist/minitz.min.mjs";

	// ... see usage section ...
</script>
```
## Documentation

Full documentation available at [hexagon.github.io/minitz](https://hexagon.github.io/minitz/).

### Examples

Assuming you have imported minitz as described under 'Installation'.

```javascript
// ToDo
```

## Contributing

See [Contribution Guide](/CONTRIBUTING.md)

## License

MIT
