# IndexedMap

A map that maintains the order of entries. Give access to entries by index or key. Keys have to be unique in map.

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
myMap.insert('myKey', { myProperty:'My Value' });
```

### Constructor

* `var myMap = IndexedMap();`
* `var myMap = new IndexedMap();`

Keyword `new` is optinal, it will be called by IndexedMap it self, if necessary. 

### methods

* `length()`
* `keys()`
* `sort(callback)`
* `revers()`
* `find(callback)`
* `each(callback)`

### _key_ based methods:

* `indexOf(key:string)`
* `get( key:string )` 
* `set( key:string, value:any )`
* `insert( key:string, value:any )` 
* `move( key:string, targetKey:string )`
* `remove( key:string )` 
* `has(key:string)`
 
### _index_ based pendant with sufix 'At':

* `keyAt( index:number )`
* `getAt( index:number )`
* `setAt( index:number, value:any )`
* `insertAt( index:number, value:any )`
* `moveAt( index:number, targetIndex:number )`
* `removeAt( index:number )`

### _key_ returning methods:

* `first()`
* `last()`
* `next(key:string)`
* `prev(key:string)`

### _value_ returning methods (prefix 'get'):

* `getFirst()`
* `getLast()`
* `getNext(key:string)`
* `getPrev(key:string)`



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