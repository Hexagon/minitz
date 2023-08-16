---
layout: page
title: "Usage"
nav_order: 1
---

# Minitz

---

The minimal JS/TS timezone conversion library.

Minitz offers an efficient and convenient way to manage and manipulate dates and times in JavaScript. With a modern ES-module design and full typings, minitz is compatible with numerous environments, including Node, Deno, Bun, and browsers.

While converting a Date object to another timezone in JavaScript is achievable using the Intl feature of vanilla JS, things can get complicated when you want to convert date/time from another timezone or between different timezones. Minitz addresses this problem in the most straightforward manner, ensuring compatibility across all environments (Node/Deno/Browser, ESM/UMD/CommonJS).

## Basic Conversion using Vanilla JS

Vanilla JavaScript provides a way to convert a Date object **to** a specific timezone. 

For instance, if you want to get the current time in Asia/Tokyo:

```javascript
// Get current time in Asia/Tokyo, using vanilla js
new Date().toLocaleString("sv-SE", { timeZone: "Asia/Tokyo" });
// -> 2022-09-15 17:23:45
```

## Conversion using Minitz

Here are a few simple examples on using minitz to convert **from** and **across** different time zones:

### Conversion from a Specific Timezone to Local Time

```javascript
// Get local time from time in Asia/Tokyo, using minitz and vanilla js
const localTime = minitz(2022,9,15,23,0,0,"Asia/Tokyo")
console.log( localTime.toLocaleString("sv-SE") );
// -> 2022-09-15 16:00:00
```

### Conversion between Two Different Timezones

```javascript
// Get time in America/New_York from time in Asia/Tokyo, using minitz and vanilla js
// Also demonstrates that it's possible to use ISO8601 strings as input to minitz, 
// through `.fromTZISO`
const localTime = minitz.fromTZISO("2022-09-15 23:00:00","Asia/Tokyo");
console.log( localTime.toLocaleString("sv-SE", { timeZone: "America/New_York" }) );
// -> 2022-09-15 10:00:00
```

{% include multiplex.html %}

More examples on the [Examples page](./examples.md).

## Key Features & Compatibility

* **Broad Compatibility**: Works seamlessly across Node.js (≥14.0), Deno (≥1.8), Bun (≥0.2.2), and browsers. It also provides support for different module systems, such as standalone, UMD, and ES-modules.

* **Concise and Lightweight**: With a size of less than 2 KB when minified and devoid of external dependencies, Minitz ensures fast load times. It's built on JavaScript's Intl object and follows the best coding practices.

* **TypeScript Support**: Minitz comes bundled with TypeScript typings, ensuring a smooth experience for TypeScript developers.

* **License**: Licensed under MIT, Minitz guarantees maximum freedom for developers to use, modify, and distribute their code.

Try Minitz live on [jsfiddle](https://jsfiddle.net/hexag0n/3mheu5by/)

{% include multiplex.html %}

## Conversion Functions

### `minitz(y, m, d, h, i, s, tz, [throwOnInvalid])`

**Description**: Converts a date and time from a specified timezone to the system's local time.

**Parameters**:
- `y (Number)`: Year, starting from 1970.
- `m (Number)`: Month, 1-12 (January to December).
- `d (Number)`: Day of the month, 1-31.
- `h (Number)`: Hour, 0-24.
- `i (Number)`: Minute, 0-60.
- `s (Number)`: Second, 0-60.
- `tz (String)`: Timezone in IANA database format.
- `throwOnInvalid (Boolean, optional)`: If true, throws an exception during DST switches. Default is false.

**Returns**: JavaScript Date object (reflecting UTC and system's local time).

### `minitz.fromTZISO(localTimeStr, tz, [throwOnInvalid])`

**Description**: Converts an ISO8601 formatted string from a given timezone to the system's local date object.

**Parameters**:
- `localTimeStr (String)`: ISO8601 formatted string not in UTC.
- `tz (String)`: Timezone in IANA database format.
- `throwOnInvalid (Boolean, optional)`: If true, throws an exception during DST switches. Default is false.

**Returns**: JavaScript Date object.

### `minitz.fromTZ(tp, [throwOnInvalid])`

**Description**: Converts a time from a specified timezone to the system's local date object.

**Parameters**:
- `tp (TimePoint object)`: TimePoint object with properties year, month, day, hour, minute, second, and timezone.
- `throwOnInvalid (Boolean, optional)`: If true, throws an exception during DST switches. Default is false.

**Returns**: JavaScript Date object.

### `minitz.toTZ(d, tzStr)`

**Description**: Converts a given date object to a specific timezone, returning a `TimePoint` object.

**Parameters**:
- `d (Date)`: JavaScript Date object to be converted.
- `tzStr (String)`: Timezone in IANA database format.

**Returns**: `TimePoint` object reflecting the time in the specified timezone.

### `minitz.tp(y, m, d, h, i, s, tz)`

**Description**: Generates a `TimePoint` object for later use in `fromTZ`.

**Parameters**:
- `y (Number)`: Year, starting from 1970.
- `m (Number)`: Month, 1-12 (January to December).
- `d (Number)`: Day of the month, 1-31.
- `h (Number)`: Hour, 0-24.
- `i (Number)`: Minute, 0-60.
- `s (Number)`: Second, 0-60.
- `tz (String)`: Timezone in IANA database format.

**Returns**: `TimePoint` object.

Minitz provides several functions to handle date/time conversions:

### TimePoint Object

A standard object format that Minitz uses to represent date/time information.

```js
/**
 * @typedef {Object} TimePoint
 * @property {Number} y - 1970--
 * @property {Number} m - 1-12
 * @property {Number} d - 1-31
 * @property {Number} h - 0-24
 * @property {Number} i - 0-60 Minute
 * @property {Number} s - 0-60
 * @property {string} tz - Time zone in IANA database format 'Europe/Stockholm'
 */
```