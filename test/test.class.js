var IndexedMap = require('../');

describe('test API of class IndexedMap', function () {

	var mapA;
	
	it('Constructor (with new) should creat an empty IndexedMap instance.', function () {
		mapA =  new IndexedMap();
		return expect( mapA ).to.be.exist; //use "return" to suppresses jshint warning "Expected an assignment ..."
	});

	it('Constructor (without new) should creat an empty IndexedMap instance.', function () {
		mapA =  IndexedMap();
		return expect( mapA ).to.be.exist; //use "return" to suppresses jshint warning "Expected an assignment ..."
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

describe('test methods length, insert and insertAt', function () {

	describe('.length()', function () {
		var mapA = IndexedMap();
		var mapB = IndexedMap();

		it('.length should return 0 for empty map', function () {
			expect( mapA.length() ).to.be.equal(0);
			expect( mapB.length() ).to.be.equal(0);
		});
	
		it('//add entry to mapA', function () {
			return expect( mapA.insert('keyA', {} ) ).not.to.be["null"];
			// replace '.null' to avoid syntax error message
			 //use "return" to suppresses jshint warning "Expected an assignment ..."
		});
		
		it('.length should return 1 for mapA and 0 for mapB', function () {
			expect( mapA.length() ).to.be.equal(1);
			expect( mapB.length() ).to.be.equal(0);
		});
	});
	
	describe('.insert()', function () {
		var map = IndexedMap();

		it('.insert new entry "keyA"', function () {
			expect( map.insert('keyA', { value: 'valueA' }) ).not.to.be.equal(null);
			expect( map.length() ).to.be.equal(1);
		});

		it('.insert new entry "keyB" at position "keyA" ', function () {
			expect( map.insert('keyB', { value: 'valueB' }, 'keyA') ).not.to.be.equal(null);
			expect( map.length() ).to.be.equal(2);
		});

		it('try to .insert again a entry with key "keyB" at position "keyA" (Error test)', function () {
			expect( map.insert('keyB', { value: 'valueB' }, 'keyA') ).to.be.equal(null);
			expect( map.length() ).to.be.equal(2);
		});
	});

	describe('.insertAt()', function () {
		var map = IndexedMap();

		it('.insert new entry "keyA"', function () {
			expect( map.insertAt('keyA', { value: 'valueA' }) ).not.to.be.equal(null);
			expect( map.length() ).to.be.equal(1);
		});

		it('.insert new entry "keyB" at position 0 ', function () {
			expect( map.insertAt('keyB', { value: 'valueB' }, 0) ).not.to.be.equal(null);
			expect( map.length() ).to.be.equal(2);
		});

		it('try to .insert again a entry with key "keyB" at position 0 (Error test)', function () {
			expect( map.insertAt('keyB', { value: 'valueB' }, 0) ).to.be.equal(null);
			expect( map.length() ).to.be.equal(2);
		});
	});
});

 describe('tests on filled map', function () {
	var map = IndexedMap();
	map.insertAt('keyA', { value: 'valueA' });
	map.insertAt('keyB', { value: 'valueB' });
	map.insertAt('keyC', { value: 'valueC' });
	map.insertAt('keyD', { value: 'valueD' });

	it(".indexOf('keyA') should return 0", function () {
		expect( map.indexOf('keyA') ).to.be.equal(0);
	});
	it(".keyAt(0) should return keyA", function () {
		expect( map.keyAt(0) ).to.be.equal('keyA');
	});

	it(".get('keyA') should return valueA", function () {
		expect( map.get('keyA') ).to.deep.equal({ value: 'valueA' });
	});
	it(".getAt(0) should return valueA", function () {
		expect( map.getAt(0) ).to.deep.equal({ value: 'valueA' });
	});

	it(".first() should return keyA", function () {
		expect( map.first() ).to.be.equal('keyA');
	});
	it(".last() should return keyD", function () {
		expect( map.last() ).to.be.equal('keyD');
	});

	it(".getFirst() should return valueA", function () {
		expect( map.getFirst() ).to.deep.equal({ value: 'valueA' });
	});
	it(".getLast() should return valueD", function () {
		expect( map.getLast() ).to.deep.equal({ value: 'valueD' });
	});


	it(".next('keyB') should return keyC", function () {
		expect( map.next('keyB') ).to.be.equal('keyC');
	});
	it(".getNext('keyB') should return valueC", function () {
		expect( map.getNext('keyB') ).to.deep.equal({ value: 'valueC' });
	});

	it(".prev('keyB') should return keyA", function () {
		expect( map.prev('keyB') ).to.be.equal('keyA');
	});
	it(".getPrev('keyB') should return valueA", function () {
		expect( map.getPrev('keyB') ).to.deep.equal({ value: 'valueA' });
	});

	it(".move('keyA', 'keyC'), new index of keyA should be old index of keyC-1 ", function () {
		var oldIndexA = map.indexOf('keyA');
		var oldIndexC = map.indexOf('keyC');

		expect( oldIndexA ).not.to.be.equal( oldIndexC );
		
		map.move('keyA', 'keyC');
		expect( map.indexOf('keyA') ).to.be.equal( oldIndexC-1 );
	});
	
	//TODO:
	// set
	// remove
	// sort
	// revers
	
	describe('.find(callback)', function () {
	
		var findCallback = function(key, value) {
			return value.value === 'valueC';
		};
	
		it('.find value:"valueC"', function () {
			expect( map.find(findCallback) ).to.deep.equal({ value: 'valueC' });
		});

		it('.find value:"valueC", start at 1 (Error test)', function () {
			expect( map.find(findCallback, 1) ).to.deep.equal({ value: 'valueC' });
		});
		
		it('.find value:"valueC", start at 3 (Error test)', function () {
			expect( map.find(findCallback, 3) ).to.be.equal(null);
		});
	});
});