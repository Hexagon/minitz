export default minitz;
export type TimePoint = {
    year: number;
    /**
     * - Normally indexed month, 1 is january, 2 is february etc.
     */
    month: number;
    day: number;
    hour: number;
    minute: number;
    /**
     * - Time zone in format 'Europe/Stockholm'
     */
    timezone: string;
};
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
export function minitz(year: any, month: any, day: any, hour: any, minute: any, second: any, timezone: any, throwOnInvalidTime: any): any;
export namespace minitz {
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
    export function toTZ(date: any, tzString?: string): TimePoint;
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
    export function fromTZ(timePoint: any, throwOnInvalidTime?: boolean): any;
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
    export function fauxDate(timePoint: any): any;
    export function tp(y: any, m: any, d: any, h: any, i: any, s: any, t: any): {
        year: any;
        month: any;
        day: any;
        hour: any;
        minute: any;
        second: any;
        timezone: any;
    };
    export { minitz };
}
