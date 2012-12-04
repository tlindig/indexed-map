var IndexedMap = require('../');

describe('test module IndexedMap', function () {
	
	it('.version should give the version number of module', function () {
		return expect( IndexedMap.version ).to.be.exist;
		 //use "return" to suppresses jshint warning "Expected an assignment ..."
	});
});
