---
layout: page
title: "Usage"
nav_order: 1
---

# Minitz
<br>
The minimal JS/TS timezone conversion library.

Minitz offers an efficient and convenient way to manage and manipulate dates and times in JavaScript. With a modern ES-module design and full typings, minitz is compatible with numerous environments, including Node, Deno, Bun, and browsers.

While converting a Date object to another timezone in JavaScript is achievable using the Intl feature of vanilla JS, things can get complicated when you want to convert date/time from another timezone or between different timezones. Minitz addresses this problem in the most straightforward manner, ensuring compatibility across all environments (Node/Deno/Browser, ESM/UMD/CommonJS).

Vanilla js for converting **to** a specific time zone:

```javascript
// Get current time in Asia/Tokyo, using vanilla js
new Date().toLocaleString("sv-SE", { timeZone: "Asia/Tokyo" });
// -> 2022-09-15 17:23:45
```

Here are a few simple examples on using minitz to convert **from** and **across** different time zones:

```javascript
// Get local time from time in Asia/Tokyo, using minitz and vanilla js
const localTime = minitz(2022,9,15,23,0,0,"Asia/Tokyo")
console.log( localTime.toLocaleString("sv-SE") );
// -> 2022-09-15 16:00:00
```

```javascript
// Get time in America/New_York from time in Asia/Tokyo, using minitz and vanilla js
// Also demonstrates that it's possible to use ISO8601 strings as input to minitz, 
// through `.fromTZISO`
const localTime = minitz.fromTZISO("2022-09-15 23:00:00","Asia/Tokyo");
console.log( localTime.toLocaleString("sv-SE", { timeZone: "America/New_York" }) );
// -> 2022-09-15 10:00:00
```

More examples on this [Examples page](./examples.md).

{% include multiplex.html %}


## Key Features & Compatibility


- Convert dates between any timezone supported by the system.
- Parses ISO8601 time strings.
- MIT licensed, use the library any way you want. For real.
- Minimal (less than 2 KB minified), no dependencies. Relies on JavaScript Intl and current best practices.
- Works in Node.js >=14.0 (both require and import).
- Works in Deno >=1.8.
- Works in Bun >=0.2.2
- Works in browsers as standalone, UMD or ES-module.
- Includes TypeScript typings.

Try Minitz live on [jsfiddle](https://jsfiddle.net/hexag0n/3mheu5by/)


## License


MIT