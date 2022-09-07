(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.minitz = factory());
})(this, (function () { 'use strict';

	/* ------------------------------------------------------------------------------------

	  minitz - MIT License - Hexagon <hexagon@56k.guru>

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

	let minitz = {};

	/**
	 * "Converts" a date to a specific time zone
	 * 
	 * Note: This is only for specific and controlled usage, 
	 * as the internal UTC time of the resulting object will be off.
	 * 
	 * Example:
	 *   let normalDate = new Date(); // d is a normal Date instance, with local timezone and correct utc representation
	 *       tzDate = minitz.toTZ(d, 'America/New_York') // d is a tainted Date instance, where getHours() 
	 *                                                 (for example) will return local time in new york, but getUTCHours()
	 *                                                 will return something irrelevant.
	 * 
	 * @param {date} date - Input date
	 * @param {string} tzString - Timezone string in Europe/Stockholm format
	 * @returns {date}
	 */
	minitz.toTZ = function (date, tzString) {
		return new Date(date.toLocaleString("sv-SE", {timeZone: tzString}));
	};

	/**
	 * Reverse of toTZ
	 * 
	 * @param {date} date - Input (tainted) date, where local time is time in target timezone
	 * @param {string} tzString - Timezone string in Europe/Stockholm format
	 * @returns {date} - Correct date object
	 */
	minitz.fromTZ = function(sourceDate, tzString) {

		// Try using target offset
		const 
			targetPlus = new Date(sourceDate.toLocaleString("sv-SE", {timeZone: tzString})),
			offset = sourceDate.getTime() - targetPlus.getTime();

		let testOffset = 0,
			iterations = 0,
			closestAfter = -Infinity;

		while (iterations++ < 2) {
			const 
				testTarget = new Date(sourceDate.getTime() + offset - testOffset),
				test = new Date(testTarget.toLocaleString("sv-SE", {timeZone: tzString}));

			testOffset = test.getTime() - sourceDate.getTime();

			if (testOffset === 0) {
				return testTarget;
			} else {
				if (testOffset < 0 && testOffset > closestAfter) {
					closestAfter = testOffset;
				}
			}

		}

		return new Date(sourceDate.getTime() + offset - closestAfter);

	};

	minitz.minitz = minitz;

	return minitz;

}));
