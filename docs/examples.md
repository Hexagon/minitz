---
layout: page
title: "Examples"
nav_order: 3
---

# Minitz Examples

---

{% include multiplex.html %}

### Convert a specific timezone to local time

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

### Convert local time to a specific timezone

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
//     y: 2022,
//     m: 9,
//     d: 14,
//     h: 17,
//     i: 29,
//     s: 42,
//     tz: 'America/New_York'
//  }
```