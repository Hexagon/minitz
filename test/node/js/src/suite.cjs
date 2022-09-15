let 
	test = require("uvu").test,
	assert = require("uvu/assert");

// Actual tests
module.exports = function (minitz) {
	
	test("Convert to different timezone and back", function () {

		const 
			sourceUTCDate = new Date(Date.UTC(2022,0,1,0,0,0)),
			dateInNewYork = minitz.toTZ(sourceUTCDate, "America/New_York");

		const
			backToUTC = minitz.fromTZ(dateInNewYork);

		// Source date equal 
		assert.equal(sourceUTCDate.getTime(), backToUTC.getTime());

	});

	test("Convert a specific date to various timezones", function () {

		const 
			timeInStockholm = minitz(2022,9,8,14,28,27, "Europe/Stockholm");

		assert.equal(timeInStockholm.getTime(), 1662640107000);
		assert.equal(timeInStockholm.getTime(), minitz(2022,9,8,21,28,27, "Asia/Tokyo").getTime());
		assert.equal(timeInStockholm.getTime(), minitz(2022,9,8,20,28,27, "Asia/Shanghai").getTime());
		assert.equal(timeInStockholm.getTime(), minitz(2022,9,8,15,28,27, "Europe/Kiev").getTime());
		assert.equal(timeInStockholm.getTime(), minitz(2022,9,8,14,28,27, "Europe/Paris").getTime());
		assert.equal(timeInStockholm.getTime(), minitz(2022,9,8,13,28,27, "Europe/London").getTime());
		assert.equal(timeInStockholm.getTime(), minitz(2022,9,8,8,28,27, "America/New_York").getTime());
		assert.equal(timeInStockholm.getTime(), minitz(2022,9,8,5,28,27, "America/Los_Angeles").getTime());
	});

	test("Test Remote DST transition", function () {

		const localVsRemote = function (local, remote) {
			const 
				timeInLocal = minitz.fromTZ(local),
				timeInRemote = minitz.fromTZ(remote);
			assert.equal(timeInLocal.getTime(), timeInRemote.getTime());
		};
		
		localVsRemote(minitz.tp(2022,3,13,6,8,9,"Europe/Stockholm"),minitz.tp(2022,3,13,0,8,9,"America/New_York")); 
		localVsRemote(minitz.tp(2022,3,13,7,8,9,"Europe/Stockholm"),minitz.tp(2022,3,13,1,8,9,"America/New_York"));
		localVsRemote(minitz.tp(2022,3,13,8,8,9,"Europe/Stockholm"),minitz.tp(2022,3,13,3,8,9,"America/New_York")); // <-- New york DST transition 02:00 -> 03:00
		localVsRemote(minitz.tp(2022,3,13,9,8,9,"Europe/Stockholm"),minitz.tp(2022,3,13,4,8,9,"America/New_York")); 
		localVsRemote(minitz.tp(2022,3,13,10,8,9,"Europe/Stockholm"),minitz.tp(2022,3,13,5,8,9,"America/New_York"));

	});

	test("Test DST transition correction", function () {
		// 02:08 is during new york DST transition (02:00 -> 03:00), here it is corrected to 03:08 and matches correct point in another time zone
		assert.equal(
			minitz.fromTZ(minitz.tp(2022,3,13,8,8,9,"Europe/Stockholm")).getTime(),
			minitz.fromTZ(minitz.tp(2022,3,13,2,8,9,"America/New_York")).getTime()
		);
	});
	
	test("Test DST transition without correction", function () {
		// 02:08 is during new york DST transition (02:00 -> 03:00), here it is not corrected and should throw
		assert.throws(() => {
			minitz.fromTZ(minitz.tp(2022,3,13,2,8,9,"America/New_York"), true).getTime();
		});
	});

	test("Test Local DST transition", function () {

		const localVsRemote = function (local, remote) {
			const 
				timeInLocal = minitz.fromTZ(local),
				timeInRemote = minitz.fromTZ(remote);
			assert.equal(timeInLocal.getTime(), timeInRemote.getTime());
		};
		
		localVsRemote(minitz.tp(2023,3,26,0,8,9,"Europe/Stockholm"), minitz.tp(2023,3,25,19,8,9,"America/New_York")); 
		localVsRemote(minitz.tp(2023,3,26,1,8,9,"Europe/Stockholm"), minitz.tp(2023,3,25,20,8,9,"America/New_York"));
		localVsRemote(minitz.tp(2023,3,26,3,8,9,"Europe/Stockholm"), minitz.tp(2023,3,25,21,8,9,"America/New_York")); // <-- Stockholm 02:00 -> 03:00
		localVsRemote(minitz.tp(2023,3,26,4,8,9,"Europe/Stockholm"), minitz.tp(2023,3,25,22,8,9,"America/New_York"));

	});

	test("Timezone conversion", function () {
		const timeInNewYork = minitz(2023,3,25,19,8,9, "America/New_York");
		assert.equal( timeInNewYork.toLocaleString("sv-SE", { timeZone: "America/New_York"}), "2023-03-25 19:08:09");
	});

	test("Timezone conversion using fromTZISO", function () {
		const timeInNewYork = minitz.fromTZISO("2023-03-25 19:08:09", "America/New_York");
		assert.equal( timeInNewYork.toLocaleString("sv-SE", { timeZone: "America/New_York"}), "2023-03-25 19:08:09");
	});

	test("Timezone conversion throws on incomplete time", function () {
		assert.throws(() => minitz.fromTZISO("2023-03-25 1908:09", "America/New_York"));
	});
	
	test("Timezone conversion throws on non numeric time", function () {
		assert.throws(() => minitz.fromTZISO("2023-a-25 19:08:09", "America/New_York"));
	});

	test("Timezone conversion throws on UTC time", function () {
		assert.throws(() => minitz.fromTZISO("2023-03-25 19:08:09Z", "America/New_York"));
	});

	test.run();

};