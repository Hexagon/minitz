import { assertEquals, assertNotEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { minitz } from "../../../src/minitz.js";

Deno.test("Convert to different timezone and back", function () {
  const 
    sourceUTCDate = new Date(Date.UTC(2022,0,1,0,0,0)),
    dateInNewYork = minitz.toTZ(sourceUTCDate, "America/New_York"),
    backToUTC = minitz.fromTZ(dateInNewYork, "America/New_York");

  // Source date equal 
  assertEquals(sourceUTCDate.getTime(), backToUTC.getTime());

  // Source date does not equal date in santiago
  assertNotEquals(sourceUTCDate.getTime(), dateInNewYork.getTime());

});

Deno.test("Test DST transition", function () {

  const localVsRemote = function (localTZ: string, local: string, remoteTZ: string, remote: string) {
    const 
      timeInLocal = minitz.fromTZ(new Date(Date.parse(local)), localTZ),
      timeInRemote = minitz.fromTZ(new Date(Date.parse(remote)), remoteTZ);
    assertEquals(timeInLocal.getTime(), timeInRemote.getTime());
  };
  
  localVsRemote("Europe/Stockholm","2022-03-13 06:08:09","America/New_York", "2022-03-13 00:08:09"); 
  localVsRemote("Europe/Stockholm","2022-03-13 07:08:09","America/New_York", "2022-03-13 01:08:09");
  localVsRemote("Europe/Stockholm","2022-03-13 08:08:09","America/New_York", "2022-03-13 02:08:09"); // <-- New york DST transition 02:00 -> 03:00
  localVsRemote("Europe/Stockholm","2022-03-13 08:08:09","America/New_York", "2022-03-13 03:08:09"); // <-- New york DST transition 02:00 -> 03:00
  localVsRemote("Europe/Stockholm","2022-03-13 09:08:09","America/New_York", "2022-03-13 04:08:09"); 
  localVsRemote("Europe/Stockholm","2022-03-13 10:08:09","America/New_York", "2022-03-13 05:08:09");

});