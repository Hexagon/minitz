export default minitz;
export namespace minitz {
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
    export function toTZ(date: any, tzString: string): any;
    /**
     * Reverse of toTZ
     *
     * @param {date} date - Input (tainted) date, where local time is time in target timezone
     * @param {string} tzString - Timezone string in Europe/Stockholm format
     * @returns {date} - Correct date object
     */
    export function fromTZ(sourceDate: any, tzString: string): date;
    export { minitz };
}
