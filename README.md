# IndexedMap [![Build Status](https://travis-ci.org/tlindig/indexed-map.png?branch=master)](https://travis-ci.org/tlindig/indexed-map)

An enhanced map that supports easy insertion or deletion at specific position. Give access to entries by index or key. Can be used instead of a linked list.

```
Stability: 4 - API Frozen
```
( see [Stability Index](http://nodejs.org/api/documentation.html#documentation_stability_index) ) 

## Install

as node module:
```bash
npm install indexed-map --production
```

## Usage

```js
var IndexedMap = require('indexed-map');
var myMap = IndexedMap();
// add an entry at the end
myMap.insert('myKey', { myProperty:'My Value' });
```

Keys have to be of type 'string' and unique in map.
Values can by any type, there is no restrictions.

Some methods supported in two versions, one with key as reference and the
other works with index as reference (has suffix 'At').

### Constructor

* `var myMap = IndexedMap();`
* `var myMap = new IndexedMap();`

Keyword `new` is optional, it will be called by IndexedMap itself, if necessary.

### properties

* `length` {number} the count of entries

* `keys` {Array} keys in the current order

	It is the real keys array of the indexedMap, not a clone. So do not
	add, change or remove elements. That would result in an inconsistent state of indexedMap itself.

	The advantage of not cloning the key map is, that you can easily manipulate the order of keys, if you like.
	So you could use the reverse or sort method of Array.

### has, get, insert, set, move, remove

* `has( key:string ):boolean`

	checks, if given key is in map.

	*return* {boolean} true, if it could found otherwise false

* `get( key:string ) : value|null`
* `getAt( index:number ) : value|null`
 
	*return* Value for given key/index or null, if key was not found.

* `getFirst():value|null`
* `getLast():value|null`

	*return* Value of first/last entry or null, if map is empty.

* `insert( key:string, value:any ):value|null`
* `insertAt( index:number, value:any ):value|null`

	Insert new element before the referenced element targetKey.
	If reference is null or not found, new element is inserted at the end
	of the list.
	
	*return* Value for key or null if !key or key always used.


* `set( key:string, value:any ) : oldValue|null`
* `setAt( index:number, value:any ) : oldValue|null`
	
	Overwrite the value for the given key/index.
	
	*return* The old value or null, if key/index not found.

* `move( key:string, targetKey:string ) : value|null`
* `moveAt( index:number, targetIndex:number ) : value|null`
	
	Move the key to position of targetKey by inserting key before targetKey.
	If targetKey is not found, key will be moved to the end.
	
	*return* Value for key or null if key was not found.

* `remove( key:string ) : oldValue|null`
* `removeAt( index:number ) : oldValue|null`
	
	Remove the entry for the given key.
	
	*return* The old value or null, if key was not found.

### next, previous

The IndexedMap do not have a current element. To get next or previous entry,
you need to give a reference entry to the function.

* `nextKeyOf( key:string ) : key|null`
* `prevKeyOf( key:string ) : key|null`

	*return* key from entry next/previous to given key or null, if key
	has no next/previous.

* `getNextOf( key:string ) : value|null`
* `getPrevOf( key:string ) : value|null`
	
	*return* Value from entry next/previous to given key or null, if key
	has no next/previous.


### iterating methods

* `sort( [callback] )`
	
	Sort the map, that method manipulate the indexedMap.
	This function is analog to the sort function of Array.
	if no callback is specified, keys will be sorted lexicographically
	
	*params* callback {function(this:IndexedMap, valueA:any, valueB:any):number} - optional
	- called in context of indexedMap
	- compareFunction have to return _0_ for equal, _<0_ for a < b or _>0_ for a > b
	
	*return* The indexedMap

* `find(callback [, startIndex])`
	
	Returns the first key, where callback function returns true.

	*param* {function(this:IndexedMap, key:string, value:any):boolean} callback - required
	- called for every entry in context of indexedMap
	- return true will stop the search and return the value of current visited entry.
	
	*param* {number} startIndex - optional
	Position to start the search, default is 0.
	
	*return* Value of first entry found or null, if nothing found

* `each(callback [, startIndex])`

	Iterate over the indexedMap. Start at given startIndex. Run until end
	or the given callback returns 'false'.

	*param* {function(this:IndexedMap, key:string, value:any):boolean} callback - required
	- called for every entry in context of current IndexedMap
	- stop loop from within the callback function by returning false
	
	*param* {number} startIndex - optional
	  position to start the run, default: 0
	
	*return* Zhe indexedMap or null for error (missing callback).


## Test

```bash
cd <IndexedMapDir>
npm install .
npm test
```

## License

The MIT License

Copyright (c) 2012-2013 Tobias Lindig

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
