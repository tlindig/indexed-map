# IndexedMap

A map that maintains the order of entries. Give access to entries by index or key.
Keys have to be unique in map.

```
Stability: 1 Experimental
```
(Stability Index: http://nodejs.org/api/documentation.html#documentation_stability_index)

## Install

```bash
npm install indexed-map --production
```

## Usage

```js
var IndexedMap = require('indexed-map')
var myMap = IndexedMap();
// add an entry
myMap.insert('myKey', { myProperty:'My Value' });
```

Keys have to be of type 'string', values can by any type, there is no restrictions.


### Constructor

* `var myMap = IndexedMap();`
* `var myMap = new IndexedMap();`

Keyword `new` is optional, it will be called by IndexedMap itself, if necessary. 

### properties

* `length` {number} the count of entries

* `keys` {Array} keys in the current order
	
	That is not a clone, it is the real keys array of the indexedMap. So do not 
	add, change or remove elements. That would result in an inconsistent state of indexedMap itself.
	
	The advantage of not cloning the key map is, that you can easily manipulat the order of keys, if you like.
	So you could use the reverse or sort method of Array.

### methods

* `sort(callback)`
	sort the map, that method manipulate the indexedMap.
	This function is analog to the sort function of Array.
	if no callback is specified, keys will be sorted lexicographically

	*params* callback {function(valueA, valueB ):number } - optional
	- called in context of indexedMap
	- compareFunction have to return _0_ for equal, _<0_ for a < b or _>0_ for a > b

* `find(callback)`
	return the first key, where callback(key, value) returned true.  
	
	*param* callback {function(key:string, value:object):boolean} - required
	 - called for every entry in context of indexedMap. return true will stop the search and
	   return the value of current entry.
	
	*param* startIndex {number} - optional
		position to start the search, default: 0
	
	*returns* value or null

* `each(callback)`
	Visit every entry in the indexedMap. Start at given startIndex. Run until end 
	or the given callback returns 'false'.

	*param* callback {function(key:string, value:object):boolean} - required
	- called for every entry in context of current IndexedMap. 
	- stop loop from within the callback function by returning false.
	
	*param* startIndex {number} - optional
		position to start the run, default: 0

	*returns* null

### _key_ based methods:

* `insert( key:string, value:any ):value|null` 
* `set( key:string, value:any )oldValue|null`
* `move( key:string, targetKey:string )value|null`
* `remove( key:string ):oldValue|null` 
* `has( key:string ):boolean`
* `nextOf( key:string ):key|null`
* `prevOf( key:string ):key|null`
* `get( key:string ):value|null` 
 
### _index_ based equivalent with sufix 'At':

* `getAt( index:number ):value|null`
* `setAt( index:number, value:any ):oldValue|null`
* `insertAt( index:number, value:any ):value|null`
* `moveAt( index:number, targetIndex:number ):value|null`
* `removeAt( index:number ):oldValue|null`

###  first, last, previous, next:

* `getFirst():value|null`
* `getLast():value|null`
* `getPrevOf( key:string ):value|null`
* `getNextOf( key:string ):value|null`


## Test

```bash
cd <IndexedMapDir>
npm install .
npm test
```

## License

The MIT License

Copyright (c) 2012 Tobias Lindig

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