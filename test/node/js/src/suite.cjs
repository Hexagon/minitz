let 
	test = require("uvu").test,
	assert = require("uvu/assert");

// Actual tests
module.exports = function (minitz) {
	
	test("Convert to different timezone and back", function () {

		const 
			sourceUTCDate = new Date(Date.UTC(2022,0,1,0,0,0)),
			dateInNewYork = minitz.toTZ(sourceUTCDate, "America/New_York"),
			backToUTC = minitz.fromTZ(dateInNewYork, "America/New_York");

		// Source date equal 
		assert.equal(sourceUTCDate.getTime(), backToUTC.getTime());

		// Source date does not equal date in santiago
		assert.not.equal(sourceUTCDate.getTime(), dateInNewYork.getTime());

	});

	test("Convert a specific date to various timezones", function () {

		const 
			timeInStockholm = minitz.fromTZ(new Date(Date.parse("2022-09-08 14:28:27")), "Europe/Stockholm");

		assert.equal(timeInStockholm.getTime(), 1662640107000);
		assert.equal(timeInStockholm.getTime(), minitz.fromTZ(new Date(Date.parse("2022-09-08 21:28:27")), "Asia/Tokyo").getTime());
		assert.equal(timeInStockholm.getTime(), minitz.fromTZ(new Date(Date.parse("2022-09-08 20:28:27")), "Asia/Shanghai").getTime());
		assert.equal(timeInStockholm.getTime(), minitz.fromTZ(new Date(Date.parse("2022-09-08 15:28:27")), "Europe/Kiev").getTime());
		assert.equal(timeInStockholm.getTime(), minitz.fromTZ(new Date(Date.parse("2022-09-08 14:28:27")), "Europe/Paris").getTime());
		assert.equal(timeInStockholm.getTime(), minitz.fromTZ(new Date(Date.parse("2022-09-08 13:28:27")), "Europe/London").getTime());
		assert.equal(timeInStockholm.getTime(), minitz.fromTZ(new Date(Date.parse("2022-09-08 08:28:27")), "America/New_York").getTime());
		assert.equal(timeInStockholm.getTime(), minitz.fromTZ(new Date(Date.parse("2022-09-08 05:28:27")), "America/Los_Angeles").getTime());
	});

	test("Test Remote DST transition", function () {

		const localVsRemote = function (localTZ, local, remoteTZ, remote) {
			const 
				timeInLocal = minitz.fromTZ(new Date(Date.parse(local)), localTZ),
				timeInRemote = minitz.fromTZ(new Date(Date.parse(remote)), remoteTZ);
			assert.equal(timeInLocal.getTime(), timeInRemote.getTime());
		};
		
		localVsRemote("Europe/Stockholm","2022-03-13 06:08:09","America/New_York", "2022-03-13 00:08:09"); 
		localVsRemote("Europe/Stockholm","2022-03-13 07:08:09","America/New_York", "2022-03-13 01:08:09");
		localVsRemote("Europe/Stockholm","2022-03-13 08:08:09","America/New_York", "2022-03-13 03:08:09"); // <-- New york DST transition 02:00 -> 03:00
		localVsRemote("Europe/Stockholm","2022-03-13 09:08:09","America/New_York", "2022-03-13 04:08:09"); 
		localVsRemote("Europe/Stockholm","2022-03-13 10:08:09","America/New_York", "2022-03-13 05:08:09");

	});

	test("Test DST transition correction", function () {
		// 02:08 is during new york DST transition (02:00 -> 03:00), here it is corrected to 03:08 and matches correct point in another time zone
		assert.equal(
			minitz.fromTZ(new Date(Date.parse("2022-03-13 08:08:09")), "Europe/Stockholm").getTime(),
			minitz.fromTZ(new Date(Date.parse("2022-03-13 02:08:09")), "America/New_York").getTime()
		);
	});
	
	test("Test DST transition without correction", function () {
		// 02:08 is during new york DST transition (02:00 -> 03:00), here it is not corrected and should throw
		assert.throws(() => {
			minitz.fromTZ(new Date(Date.parse("2022-03-13 02:08:09")), "America/New_York", true).getTime();
		});
	});

	test("Test Local DST transition", function () {

		const localVsRemote = function (localTZ, local, remoteTZ, remote) {
			const 
				timeInLocal = minitz.fromTZ(new Date(Date.parse(local)), localTZ),
				timeInRemote = minitz.fromTZ(new Date(Date.parse(remote)), remoteTZ);
			assert.equal(timeInLocal.getTime(), timeInRemote.getTime());
		};
		
		localVsRemote("Europe/Stockholm","2023-03-26 00:08:09","America/New_York", "2023-03-25 19:08:09"); 
		localVsRemote("Europe/Stockholm","2023-03-26 01:08:09","America/New_York", "2023-03-25 20:08:09");
		localVsRemote("Europe/Stockholm","2023-03-26 02:08:09","America/New_York", "2023-03-25 21:08:09"); // <-- Stockholm 02:00 -> 03:00
		localVsRemote("Europe/Stockholm","2023-03-26 03:08:09","America/New_York", "2023-03-25 21:08:09"); 
		localVsRemote("Europe/Stockholm","2023-03-26 04:08:09","America/New_York", "2023-03-25 22:08:09");

	});

	test.run();

};