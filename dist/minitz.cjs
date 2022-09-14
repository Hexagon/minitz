(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.minitz = factory());
})(this, (function () { 'use strict';

	/* ------------------------------------------------------------------------------------

	  	minitz - 2.0.0 - MIT License - Hexagon <hexagon@56k.guru>

		Bundled manually, check for updates at https://github.com/Hexagon/minitz

		------------------------------------------------------------------------------------

		License:

		Copyright (c) 2022 Hexagon <hexagon@56k.guru>

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:
		The above copyright notice and this permission notice shall be included in
		all copies or substantial portions of the Software.
		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
		THE SOFTWARE.

	  ------------------------------------------------------------------------------------  */
	  
	/**
	 * @typedef {Object} TimePoint
	 * @property {Number} year 
	 * @property {Number} month - Normally indexed month, 1 is january, 2 is february etc.
	 * @property {Number} day
	 * @property {Number} hour
	 * @property {Number} minute
	 * @property {Number} day - Day of month
	 * @property {string} timezone - Time zone in format 'Europe/Stockholm'
	 */

	/*
	 * Converts a date/time from a specific timezone to a normal date object with system local time
	 *
	 * Shortcut for minitz.fromTZ(minitz.tp(...));
	 * 
	 * @public
	 * 
	 * @param {Number} year 
	 * @param {Number} month - Zero indexed month, 0 is january, 1 is february etc.
	 * @param {Number} day
	 * @param {Number} hour
	 * @param {Number} minute
	 * @param {Number} day - Day of month
	 * @param {string} timezone - Time zone in format 'Europe/Stockholm'
	 * @param {boolean} [throwOnInvalidTime] - Default is to return adjusted time if input time is during an DST switch. 
	 *                                        E.g. assume 01:01:01 if input is 00:01:01 but time actually 
	 *                                        skips from 23:59:59 to 01:00:00. Setting this flag makes the library throw instead.
	 * @returns {null|date} - Normal date object with correct UTC and system local time
	 * 
	*/
	const minitz = function (year, month, day, hour, minute, second, timezone, throwOnInvalidTime) {
		return minitz.fromTZ(minitz.tp(year, month, day, hour, minute, second, timezone, throwOnInvalidTime));
	};

	/**
	 * Convert a date to a specific time zone and return i TimePoint representation 
	 * 
	 * **Note:** The resulting Date object will have local time set to target timezone, 
	 * but any functions/formatting working with UTC time, or offset will be misleading.
	 * 
	 * Only use this function to get a formatted local time string.
	 * 
	 * Example:
	 *   let normalDate = new Date(); // d is a normal Date instance, with local timezone and correct utc representation
	 *       tzDate = minitz.toTZ(d, 'America/New_York') // d is a tainted Date instance, where getHours() 
	 *                                                 (for example) will return local time in new york, but getUTCHours()
	 *                                                 will return something irrelevant.
	 * 
	 * @public
	 * 
	 * @param {date} date - Input date
	 * @param {string} [tzString] - Timezone string in Europe/Stockholm format
	 * @returns {TimePoint}
	 */
	minitz.toTZ = function (date, tzString) {
		const target = new Date(date.toLocaleString("sv-SE", {timeZone: tzString}));
		return {
			year: target.getFullYear(),
			month: target.getMonth() + 1,
			day: target.getDate(),
			hour: target.getHours(),
			minute: target.getMinutes(),
			second: target.getSeconds(),
			timezone: tzString
		};
	};

	const getTimezoneOffset = (timeZone, date = new Date()) => {
		const tz = date.toLocaleString("en", {timeZone, timeStyle: "long"}).split(" ").slice(-1)[0];
		const dateString = date.toString();
		return Date.parse(`${dateString} UTC`) - Date.parse(`${dateString} ${tz}`);
	};

	/**
	 * Converts a date/time from a specific timezone to a normal date object with system local time
	 * 
	 * @public
	 * 
	 * @param {TimePoint} date - TimePoint instance with specified timezone
	 * @param {boolean} [throwOnInvalidTime] - Default is to return adjusted time if input time is during an DST switch. 
	 *                                        E.g. assume 01:01:01 if input is 00:01:01 but time actually 
	 *                                        skips from 23:59:59 to 01:00:00. Setting this flag makes the library throw instead.
	 * @returns {null|date} - Normal date object with correct UTC and Local time
	 */
	minitz.fromTZ = function(timePoint, throwOnInvalidTime) {
		// Get initial offset between timezones starting from input time.
		// Then create a guessed local time by subtracting offset from input time
		// and try recreating input time using guessed local time and calculated offset.
		const 
			inputDate = new Date(Date.UTC(
				timePoint.year,
				timePoint.month - 1,
				timePoint.day,
				timePoint.hour,
				timePoint.minute,
				timePoint.second
			)),

			// Get offset between UTC and source timezone
			offset = getTimezoneOffset(timePoint.timezone, inputDate),

			// Remove offset from inputDate to get a true date object
			guessedLocalDate = new Date(inputDate.getTime() - offset),

			// Get offset between UTC and guessed time in target timezone
			guessedInputDateOffset = getTimezoneOffset(timePoint.timezone, guessedLocalDate);

		if ((guessedInputDateOffset - offset) === 0) {
			// All good, return local time
			return guessedLocalDate;
		} else {
			// Not quite there yet, make a second try on guessing local time, adjust by the offset from previous guess
			// Try recreating input time again
			// Then calculate and check offset again
			const 
				guessedLocalDate2 = new Date(inputDate.getTime() - guessedInputDateOffset),
				guessedInputDateOffset2 = getTimezoneOffset(timePoint.timezone, guessedLocalDate2);
			if ((guessedInputDateOffset2 - guessedInputDateOffset) === 0) {
				// All good, return local time
				return guessedLocalDate2;
			} else if (!throwOnInvalidTime) {
				// Input time is invalid, it is probably a point in time skipped by a DST switch, return the local time adjusted by initial offset
				return guessedLocalDate;
			} else {
				// Input time is invalid, and the library is instructed to throw, so let's do it
				throw new Error("Invalid date passed to fromTZ()");
			}
		}
	};

	/**
	 * Utility that converts the result from toTZ (TimePoint-object) to a normal JavaScript date object.
	 * 
	 * Not that the resulting date object has internal time offset to make toLocaleString(), getHours() etc
	 * return local time in target timezone. Do NOT try to use this object for anything else, like getUTCHours()
	 * 
	 * @public
	 * 
	 * @param {TimePoint} date - TimePoint instance with specified timezone
	 * @returns {null|date} - Faux date object with offset internal time and Local time set according to target timezone
	 */
	minitz.fauxDate = function (timePoint) {
		return new Date(
			timePoint.year,
			timePoint.month - 1,
			timePoint.day,
			timePoint.hour,
			timePoint.minute,
			timePoint.second
		);
	};

	/*
	 * Standardized way of creating a TimePoint object for use with fromTZ
	 *
	 * @public
	 * 
	 * @param {Number} year 
	 * @param {Number} month - Normally indexed month, 1 is january, 2 is february etc.
	 * @param {Number} day
	 * @param {Number} hour
	 * @param {Number} minute
	 * @param {Number} day - Day of month
	 * @param {string} timezone - Time zone in format 'Europe/Stockholm'
	 * @returns {TimePoint}
	 * 
	*/
	minitz.tp = (y,m,d,h,i,s,t) => { return { year: y, month: m, day: d, hour: h, minute: i, second: s, timezone: t }; };

	minitz.minitz = minitz;

	return minitz;

}));
