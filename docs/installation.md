---
layout: page
title: "Installation"
nav_order: 2
---

# Installing Minitz
<br>

{% include display.html %}

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
import minitz from "https://deno.land/x/minitz@4.0.4/src/minitz.js";

// ...
```

TypeScript

```typescript
import { minitz } from "https://deno.land/x/minitz@4.0.4/src/minitz.js";

// ...
```

Check [https://deno.land/x/minitz](https://deno.land/x/minitz) for latest available version


### Bun


```bun add minitz```

> **Note** If you experience problems during install, try using `bun add minitz --backend=copyfile`.

JavaScript

```javascript
import minitz from "minitz";
```


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