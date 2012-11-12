;/*!
* LinkedMap
* Copyright(c) 2012 Tobias Lindig
* MIT Licensed
*/

/**
* Module dependencies.
*/
//nothing yet

/**
 * make class LinkedMap public
 */
exports = module.exports = LinkedMap;
	

/**
 * private hidden class to store key and value
 */
function Entry(key, value) {
	this.key	= key;
	this.value	= value;
};

/**
 * implementation of class LinkedMap
 */
function LinkedMap()	{
	
	//ensure it called with 'new'
	if( !(this instanceof LinkedMap) ) {
		return new LinkedMap(); 
	}

	/// {Object.<Entry>} map to store the value for a key
	this._map = {}; 
	/// {Array.<string>} array to store the keys in order
	this._list = []; 	
};

LinkedMap.prototype = {

	length : function() {
		return this._list.length;
	},

	has : function(key) {
		return (key && this._map[key]) ? true : false;
	},
	
	sort : function(callback) {
		if(callback) {
			this._list.sort(function(a,b) {
				return callback(this._map[a], this._map[b]);
			});
		} else {
			//sort keys lexicographically
			this._list.sort();
		}
	},
	
	revers : function() {
		this._list.revers();
	},

	/** return the first key, where callback(key, value) returned true.  
	 * 
	 * @param callback {function(key:string, value:object):boolean}
	 *  - called for every entry in context of list. return true will stop the search and
	 *   return the value of current entry.
	 * @param startIndex {number} - position to start the search
	 * 
	 * @returns key or null
	 */
	find : function(callback, startIndex) {
		if(typeof(callback) !== 'function') {
			throw new Error('Callback have to be a function(key:string, value:object):boolean');
			return;
		}
		
		var i = (typeof(startIndex) === 'number' && startIndex > 0) ? startIndex : 0;
		for(; i < this._list.length; ++i) {
			if(callback.call(this, this._list[i], this._map[this._list[i]].value) ) {
				return this._list[i];
			}
		}
		return null;
	},

	/** return index for key
	 * 
	 */
	indexOf : function(key) {
		return this._list.indexOf(key);
	},
	
	/** return key of first entry
	 * 
	 */
	first : function() {
		if(this._list.length) {
			return this._list[0];
		} else {
			return null;
		}
	},
	
	/** return value of first entry
	 * 
	 */
	getFirst : function() {
		if(this._list.length) {
			return this._map[this._list[0]].value;
		} else {
			return null;
		}
	},
	
	/** return key of last entry
	 * 
	 */
	last : function() {
		if(this._list.length) {
			return this._list[this._list.length-1];
		} else {
			return null;
		}
	},
	
	/** return value of last entry
	 * 
	 */
	getLast : function() {
		if(this._list.length) {
			return this._map[this._list[this._list.length-1]].value;
		} else {
			return null;
		}
	},
	
	/** return key from next entry referenced by key
	 * 
	 */
	next : function(key) {
		if(this.has(key)) {
			return this._list[this._list.indexOf(key)+1];
		}
		else {
			return null;
		}
	},
	
	/** return value from next entry referenced by key
	 * 
	 */
	getNext : function(key) {
		var nextKey = this.next(key);
		if(nextKey) {
			return this._map[nextKey].value;
		} else {
			return null;
		}
	},

	/** return key from previous entry referenced by key
	 * 
	 */
	prev : function(key) {
		if(this.has(key)) {
			return this._list[this._list.indexOf(key)-1];
		}
		else {
			return null;
		}
	},
	
	/** return value from previous entry referenced by key
	 * 
	 */
	getPrev : function(key) {
		var prevKey = this.prev(key);
		if(prevKey) {
			return this._map[prevKey].value;
		} else {
			return null;
		}
	},

	get : function(key) {
		if(key && this._map[key]) {
			return this._map[key].value;
		}
		else {
			return null;
		}
	},
	
	getAt : function(index) {
		return this.get(this._list[index]);
	},
	
	getKeyAt : function(index) {
		return this._list[index];
	},
	
	/** Overwrite the value for the given key.
	 * return 
	 * 	old value or 
	 * 	null, if key not found.
	 * 
	 */
	set : function(key, value) {
		if(key && this._map[key]) {
			var oldValue = this._map[key].value;
			this._map[key].value = value;
			return oldValue;
		}
		else {
			return null;
		}
	},
	
	setAt : function(index, value) {
		return this.set(this._list[index], value);
	},
	
	/** Insert new element before the referenced element targetKey.
	 *  If reference is null or not found, new element is inserted at the end
	 *  of the list.
	 *  If key always used in the map, null will be returned.
	 * 
	 */
	insert : function(key, value, targetKey) {
		return this.insertAt(key, value, this._list.indexOf(targetKey));
	},
	
	insertAt : function(key, value, targetIndex) {
		if(!key || this._map[key]) {
			//no key or key is used
			return null;
		}
	
		this._map[key] = new Entry(key, value);
		if(typeof(targetIndex) !== 'number' || targetIndex < 0 || targetIndex >= this._list.length) {
			//add to end
			this._list.push(key);
			return this._map[key].value;
		} else {
			//add to target position
			this._list.slice(targetIndex, 0, key);
			return this._map[key].value;
		}
	},
	
	move : function(key, targetKey) {
		if(!key || !this._map[key]) {
			return null;
		};
		
		var key = this._list.slice(index, 1)[0];//remove key
		var targetIndex = this._list.indexOf(targetKey);//if key not found, we get -1, that is safe for slice
		this._list.slice(targetIndex, 0, key);
	},
	
	moveAt : function(index, targetIndex) {
		this.move(this._list[index], this._list[targetIndex]);
	},
	
	/** remove the entry for the given key. 
	 *  value of the removed entry will be returned. 
	 *  If key is null or not found, null will be returned. 	 * 
	 */
	remove : function(key) {
		if(!this._map[key]) {
			//key is not found
			return null;
		}
	
		var oldValue = this._map[key].value;
		delete this._map[key];
		var index = this._list.indexOf(key);
		this._list.slice(index, 1);
		
		return oldValue;
	},
	
	removeAt : function(index) {
		return this.remove(this._list[index]);
	}
};
