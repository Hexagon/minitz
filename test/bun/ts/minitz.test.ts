import { expect, test } from "bun:test";
import { minitz } from "../../../src/minitz.js";
import type { TimePoint } from "../../../src/minitz.js";

test("Convert to different timezone and back", function () {
  const sourceUTCDate = new Date(Date.UTC(2022, 0, 1, 0, 0, 0)),
    dateInNewYork = minitz.toTZ(sourceUTCDate, "America/New_York");

  const backToUTC = minitz.fromTZ(dateInNewYork);

  // Source date equal
  expect(sourceUTCDate.getTime()).toBe(backToUTC.getTime());
});

test("Timezone conversion using fromTZISO including negative offset and milliseconds", function () {
  const timeInHelsinki = minitz.fromTZISO("2022-09-23T13:52:34.123-03:00", "America/Belem");
  expect(
    timeInHelsinki.toLocaleString("sv-SE", { timeZone: "Europe/Stockholm" })).toBe(
    "2022-09-23 18:52:34",
  );
});

test("Test DST transition", function () {
  const localVsRemote = function (local: TimePoint, remote: TimePoint) {
    const timeInLocal = minitz.fromTZ(local),
      timeInRemote = minitz.fromTZ(remote);
    expect(timeInLocal.getTime()).toBe(timeInRemote.getTime());
  };

  localVsRemote(
    minitz.tp(2022, 3, 13, 6, 8, 9, "Europe/Stockholm"),
    minitz.tp(2022, 3, 13, 0, 8, 9, "America/New_York"),
  );
  localVsRemote(
    minitz.tp(2022, 3, 13, 7, 8, 9, "Europe/Stockholm"),
    minitz.tp(2022, 3, 13, 1, 8, 9, "America/New_York"),
  );
  localVsRemote(
    minitz.tp(2022, 3, 13, 8, 8, 9, "Europe/Stockholm"),
    minitz.tp(2022, 3, 13, 3, 8, 9, "America/New_York"),
  ); // <-- New york DST transition 02:00 -> 03:00
  localVsRemote(
    minitz.tp(2022, 3, 13, 9, 8, 9, "Europe/Stockholm"),
    minitz.tp(2022, 3, 13, 4, 8, 9, "America/New_York"),
  );
  localVsRemote(
    minitz.tp(2022, 3, 13, 10, 8, 9, "Europe/Stockholm"),
    minitz.tp(2022, 3, 13, 5, 8, 9, "America/New_York"),
  );
});
