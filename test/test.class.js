var LinkedMap = require('../');

describe('test API of class LinkedMap', function () {

	var mapA;
	
	it('Constructor (with new) should creat an empty LinkedMap instance.', function () {
		mapA =  new LinkedMap();
		expect( mapA ).to.be.exist;
	});

	it('Constructor (without new) should creat an empty LinkedMap instance.', function () {
		mapA =  LinkedMap();
		expect( mapA ).to.be.exist;
	});

	it('.length should expose a function', function () {
		expect( mapA.length ).to.be.a('function');
	});
	
	it('.indexOf should expose a function', function () {
		expect( mapA.indexOf ).to.be.a('function');
	});

	it('.has should expose a function', function () {
		expect( mapA.has ).to.be.a('function');
	});

	it('.insert should expose a function', function () {
		expect( mapA.insert ).to.be.a('function');
	});

});

describe('test .length', function () {
	var mapA = LinkedMap();
	var mapB = LinkedMap();

	it('.length should return 0 for empty map', function () {
		expect( mapA.length() ).to.be.equal(0);
		expect( mapB.length() ).to.be.equal(0);
	});

	it('//add entry to mapA', function () {
		expect( mapA.insert('keyA', {} ) ).not.to.be.null;
	});
	
	it('.length should return 1 for mapA and 0 for mapB', function () {
		expect( mapA.length() ).to.be.equal(1);
		expect( mapB.length() ).to.be.equal(0);
	});

});
