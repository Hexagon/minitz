let 
	test = require("uvu").test,
	assert = require("uvu/assert");

// Actual tests
module.exports = function (/*minitz*/) {
	
	test("Initial test", function () {
		assert.equal(true, true);
	});
	
	test.run();

};