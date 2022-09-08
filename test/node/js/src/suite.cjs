let 
	test = require("uvu").test,
	assert = require("uvu/assert");

// Actual tests
module.exports = function (minitz) {
	
	test("Convert to different timezone and back", function () {

		const 
			sourceUTCDate = new Date(Date.UTC(2022,0,1,0,0,0)),
			dateInSantiago = minitz.toTZ(sourceUTCDate, "America/Santiago"),
			backToUTC = minitz.fromTZ(dateInSantiago, "America/Santiago");

		// Source date equal 
		assert.equal(sourceUTCDate.getTime(), backToUTC.getTime());

		// Source date does not equal date in santiago
		assert.not.equal(sourceUTCDate.getTime(), dateInSantiago.getTime());

	});

	test("Convert a specific date to various timezones", function () {

		const 
			timeInStockholm = new Date(Date.parse("2022-09-08 14:28:27")),

			localTime = minitz.fromTZ(timeInStockholm, "Europe/Stockholm"),

			timeInTokyo = minitz.toTZ(localTime, "Asia/Tokyo"),
			timeInShanghai = minitz.toTZ(localTime, "Asia/Shanghai"),
			timeInKyiv = minitz.toTZ(localTime, "Europe/Kiev"),
			timeInParis = minitz.toTZ(localTime, "Europe/Paris"),
			timeInLondon = minitz.toTZ(localTime, "Europe/London"),
			timeInNewYork = minitz.toTZ(localTime, "America/New_York"),
			timeInLosAngeles = minitz.toTZ(localTime, "America/Los_Angeles");

		assert.equal(minitz.toTZ(localTime, "Europe/Stockholm").toLocaleString("sv-SE"),"2022-09-08 14:28:27");

		assert.equal(minitz.toTZ(timeInTokyo, "Europe/Stockholm").toLocaleString("sv-SE"),"2022-09-08 21:28:27");
		assert.equal(minitz.toTZ(timeInShanghai, "Europe/Stockholm").toLocaleString("sv-SE"),"2022-09-08 20:28:27");
		assert.equal(minitz.toTZ(timeInKyiv, "Europe/Stockholm").toLocaleString("sv-SE"),"2022-09-08 15:28:27");
		assert.equal(minitz.toTZ(timeInParis, "Europe/Stockholm").toLocaleString("sv-SE"),"2022-09-08 14:28:27");
		assert.equal(minitz.toTZ(timeInLondon, "Europe/Stockholm").toLocaleString("sv-SE"),"2022-09-08 13:28:27");
		assert.equal(minitz.toTZ(timeInNewYork, "Europe/Stockholm").toLocaleString("sv-SE"),"2022-09-08 08:28:27");
		assert.equal(minitz.toTZ(timeInLosAngeles, "Europe/Stockholm").toLocaleString("sv-SE"),"2022-09-08 05:28:27");
	});

	test("Convert a specific date from various timezones", function () {

		const 
			timeInTokyo = minitz.fromTZ(new Date(Date.parse("2022-09-08 21:28:27")), "Asia/Tokyo"),
			timeInShanghai = minitz.fromTZ(new Date(Date.parse("2022-09-08 20:28:27")), "Asia/Shanghai"),
			timeInKyiv = minitz.fromTZ(new Date(Date.parse("2022-09-08 15:28:27")), "Europe/Kiev"),
			timeInParis = minitz.fromTZ(new Date(Date.parse("2022-09-08 14:28:27")), "Europe/Paris"),
			timeInLondon = minitz.fromTZ(new Date(Date.parse("2022-09-08 13:28:27")), "Europe/London"),
			timeInNewYork = minitz.fromTZ(new Date(Date.parse("2022-09-08 08:28:27")), "America/New_York"),
			timeInLosAngeles = minitz.fromTZ(new Date(Date.parse("2022-09-08 05:28:27")), "America/Los_Angeles");

		assert.equal(minitz.toTZ(timeInTokyo, "Europe/Stockholm").toLocaleString("sv-SE"),"2022-09-08 14:28:27");
		assert.equal(minitz.toTZ(timeInShanghai, "Europe/Stockholm").toLocaleString("sv-SE"),"2022-09-08 14:28:27");
		assert.equal(minitz.toTZ(timeInKyiv, "Europe/Stockholm").toLocaleString("sv-SE"),"2022-09-08 14:28:27");
		assert.equal(minitz.toTZ(timeInParis, "Europe/Stockholm").toLocaleString("sv-SE"),"2022-09-08 14:28:27");
		assert.equal(minitz.toTZ(timeInLondon, "Europe/Stockholm").toLocaleString("sv-SE"),"2022-09-08 14:28:27");
		assert.equal(minitz.toTZ(timeInNewYork, "Europe/Stockholm").toLocaleString("sv-SE"),"2022-09-08 14:28:27");
		assert.equal(minitz.toTZ(timeInLosAngeles, "Europe/Stockholm").toLocaleString("sv-SE"),"2022-09-08 14:28:27");
		
	});

	test("Test DST transition", function () {

		const localVsRemote = function (localTZ, local, remoteTZ, remote) {

			const 
				timeInLocal = minitz.toTZ(minitz.fromTZ(new Date(Date.parse(local)), localTZ), localTZ),
				timeInRemote = minitz.toTZ(timeInLocal, remoteTZ);

			assert.equal(timeInLocal.toLocaleString("sv-SE"), local);
			assert.equal(timeInRemote.toLocaleString("sv-SE"), remote);
		};
		
		localVsRemote("Europe/Stockholm","2022-09-11 07:08:09","America/Santiago", "2022-09-11 02:08:09");
		localVsRemote("Europe/Stockholm","2022-09-11 06:08:09","America/Santiago", "2022-09-11 01:08:09");
		//localVsRemote("Europe/Stockholm","2022-09-11 05:08:09","America/Santiago", "2022-09-10 23:08:09");
		//localVsRemote("Europe/Stockholm","2022-09-11 04:08:09","America/Santiago", "2022-09-10 22:08:09");
		//localVsRemote("Europe/Stockholm","2022-09-11 03:08:09","America/Santiago", "2022-09-10 21:08:09");

	});
	
	test.run();

};

/*
const 
    localTime = new Date(Date.parse("2022-09-08 14:28:27")),
    timeInSantiago = minitz.toTZ(localTime, "America/Santiago");

console.log("Local time: ", localTime.toLocaleString('sv-SE'));
// OK Local time:  2022-09-11 07:08:09
// OK Local time:  2022-09-11 06:08:09
// OK Local time:  2022-09-11 05:08:09
// OK Local time:  2022-09-11 04:08:09
// OK Local time:  2022-09-11 03:08:09

console.log("Time in Santiago: ", timeInSantiago.toLocaleString('sv-SE'));
// OK Time in santiago: 2022-09-11 02:08:09
// OK Time in santiago: 2022-09-11 01:08:09
// OK Time in santiago: 2022-09-10 23:08:09
// OK Time in santiago: 2022-09-10 22:08:09
// OK Time in santiago: 2022-09-10 21:08:09
*/

/*
const 
    timeInSantiago = new Date(Date.parse("2022-10-29 23:08:09")),
    localTime = minitz.fromTZ(timeInSantiago, "America/Santiago");

console.log("Time in Santiago: ", timeInSantiago.toLocaleString('sv-SE'));
// OK Time in santiago: 2022-09-11 02:08:09
// OK Time in santiago: 2022-09-11 01:08:09
// OK Time in santiago: 2022-09-11 00:08:09
// OK Time in santiago: 2022-09-10 23:08:09
// OK Time in santiago: 2022-09-10 22:08:09
// OK Time in santiago: 2022-09-10 21:08:09
// OK Time in santiago: 2022-03-26 22:08:09
// OK Time in santiago: 2022-03-26 21:08:09
// OK Time in santiago: 2022-10-29 20:08:09
// OK Time in santiago: 2022-10-29 21:08:09
// OK Time in santiago: 2022-10-29 22:08:09
// OK Time in santiago: 2022-10-29 23:08:09

console.log("Local time: ", localTime.toLocaleString('sv-SE'));
// OK Local time:  2022-09-11 07:08:09
// OK Local time:  2022-09-11 06:08:09
// OK Local time:  null OR 2022-09-11 06:08:09
// OK Local time:  2022-09-11 05:08:09
// OK Local time:  2022-09-11 04:08:09
// OK Local time:  2022-09-11 03:08:09
// OK Local time:  2022-03-27 03:08:09
// OK Local time:  2022-03-27 01:08:09
// OK Local time:  2022-09-30 01:08:09
// OK Local time:  2022-09-30 02:08:09
// OK Local time:  2022-09-30 02:08:09
// OK Local time:  2022-10-30 03:08:09
*/