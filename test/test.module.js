var LinkedMap = require('../');

describe('test module LinkedMap', function () {
	
	it('.version should give the version number of module', function () {
		return expect( LinkedMap.version ).to.be.exist;
		 //use "return" to suppresses jshint warning "Expected an assignment ..."
	});
});
