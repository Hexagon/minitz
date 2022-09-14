import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { minitz } from "../../../src/minitz.js";
import type { TimePoint } from "../../../src/minitz.js";

Deno.test("Convert to different timezone and back", function () {
  const sourceUTCDate = new Date(Date.UTC(2022, 0, 1, 0, 0, 0)),
    dateInNewYork = minitz.toTZ(sourceUTCDate, "America/New_York");

  const backToUTC = minitz.fromTZ(dateInNewYork);

  // Source date equal
  assertEquals(sourceUTCDate.getTime(), backToUTC.getTime());
});

Deno.test("Test DST transition", function () {
  const localVsRemote = function (local: TimePoint, remote: TimePoint) {
    const timeInLocal = minitz.fromTZ(local),
      timeInRemote = minitz.fromTZ(remote);
    assertEquals(timeInLocal.getTime(), timeInRemote.getTime());
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
