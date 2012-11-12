# LinkedMap

A map that maintains the order of entries. Give access to entries by index or key.

```
Stability: 1 Experimental
```
(Stability Index: http://nodejs.org/api/documentation.html#documentation_stability_index)

## Install

```bash
npm install linkedMap --production
```

## Usage

```js
var LinkedMap = require('linked-map')
var myMap = LinkedMap();
myMap.insert('myKey', { myProperty:'My Value' });
```

Key based function have a index based pendant with sufix 'At':

get( key:string ) and getAt( index:number )
set( key:string, value:any ) and setAt( index:number, value:any )
insert( key:string, value:any ) and insertAt( index:number, value:any )
move( key:string, targetKey:string ) and moveAt( index:number, targetIndex:number )
remove( key:string ) and removeAt( index:number )




## Test

```bash
cd LinkedMapDir
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