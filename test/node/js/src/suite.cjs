let 
	test = require("uvu").test,
	assert = require("uvu/assert");

// Actual tests
module.exports = function (minitz) {
	
	test("Convert to different timezone and back", function () {

		const sourceUTCDate = new Date(Date.UTC(2022,0,1,0,0,0)),
			  dateInSantiago = minitz.toTZ(sourceUTCDate, "America/Santiago"),
			  backToUTC = minitz.fromTZ(dateInSantiago, "America/Santiago");

		// Source date equal 
		assert.equal(sourceUTCDate.getTime(), backToUTC.getTime());

		// Source date does not equal date in santiago
		assert.not.equal(sourceUTCDate.getTime(), dateInSantiago.getTime());

		console.log(dateInSantiago.toISOString());
	});
	
	test.run();

};