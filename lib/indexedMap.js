/*!
* IndexedMap
* Copyright(c) 2012 Tobias Lindig
* MIT Licensed
*/

/**
* Module dependencies.
*/
//nothing yet

/**
 * implementation of class IndexedMap
 */
function IndexedMap()	{
	
	//ensure it called with 'new'
	if( !(this instanceof IndexedMap) ) {
		return new IndexedMap(); 
	}

	/// {Object} hash map to store the value for a key
	this._map = {}; 
	/// {Array.<string>} array to store the keys in order
	this._list = [];
}

IndexedMap.prototype = {

	// ///////////////////////////////
	// properties getter
	/**
	 * the count of entries
	 */
	get length() {
		return this._list.length;
	},
	/**
	 * array of keys in the current order.
	 *
	 * That is not a clone, it is the real keys array of the indexedMap. So do not 
	 * add, change or remove elements. That would result in an inconsistent state of indexedMap itself.
	 *
	 * The advantage of not cloning the key map is, that you can easily manipulat the order of keys, if you like.
	 * So you could use the reverse or sort method of Array.
	 */
	get keys() {
		return this._list;
	},

	// ///////////////////////////////
	// member functions
	/** 
	 * checks, if key is in map. 
	 * @returns {boolean} true, if it could found otherwise false
	 */
	has : function(key) {
		return this._map.hasOwnProperty(key);
	},
	
	/**
	 * sort the map, that method manipulate the indexedMap.
	 * This function is analog to the sort function of Array.
	 * if no callback is specified, keys will be sorted lexicographically
	 * 
	 * @params callback {function(valueA, valueB ):number } - optional
	 *		called in context of indexedMap
	 *		compareFunction have to return 
	 *			0 for equal,
	 *			<0 for a < b
	 *			>0 for a > b
	 */
	sort : function(callback) {
		if(typeof(callback) === 'function') {
			var self = this;
			this._list.sort(function(a,b) {
				return callback.call(self, self._map[a], self._map[b]);
			});
		} else {
			//sort keys lexicographically
			this._list.sort();
		}
	},

	/** return the first key, where callback(key, value) returned true.  
	 * 
	 * @param callback {function(key:string, value:object):boolean} - required
	 *  - called for every entry in context of indexedMap. return true will stop the search and
	 *   return the value of current entry.
	 * @param startIndex {number} - position to start the search, default: 0
	 * 
	 * @returns value or null
	 */
	find : function(callback, startIndex) {
		if(typeof(callback) === 'function') {
			var i = (typeof(startIndex) === 'number' && startIndex > 0) ? startIndex : 0;
			for(; i < this._list.length; ++i) {
				if( callback.call(this, this._list[i], this._map[this._list[i]]) ) {
					return this._map[this._list[i]];
				}
			}
		}
		return null;
	},

	/** Visit every entry in the indexedMap. Start at given startIndex. Run until end 
	 * or the given callback returns 'false'.
	 * 
	 * @param callback {function(key:string, value:object):boolean} - required
	 *  - called for every entry in context of current IndexedMap. 
	 *  - stop loop from within the callback function by returning false.
	 * @param startIndex {number} - position to start the run, default: 0
	 * 
	 * @returns null
	 */
	each : function(callback, startIndex) {
		if(typeof(callback) === 'function') {
			var i = (typeof(startIndex) === 'number' && startIndex > 0) ? startIndex : 0;
			for(; i < this._list.length; ++i) {
				if(callback.call(this, this._list[i], this._map[this._list[i]]) === false ) {
					return null; //brake
				}
			}
		}
		return null;
	},

	/**
	 * @returns value of first entry or null, if map is empty
	 */
	getFirst : function() {
		if(this._list.length) {
			return this._map[this._list[0]];
		} else {
			return null;
		}
	},
	
	/**
	 * @returns value of last entry
	 */
	getLast : function() {
		if(this._list.length) {
			return this._map[this._list[this._list.length-1]];
		} else {
			return null;
		}
	},

	/**
	 * @returns value from entry next to given key
	 */
	getNextOf : function(key) {
		var nextKey = this.nextOf(key);
		if(nextKey) {
			return this._map[nextKey];
		} else {
			return null;
		}
	},

	/**
	 * @returns value from entry previous to given key
	 */
	getPrevOf : function(key) {
		var prevKey = this.prevOf(key);
		if(prevKey) {
			return this._map[prevKey];
		} else {
			return null;
		}
	},

	/**
	 * @returns key from entry next to given key
	 */
	nextOf : function(key) {
		if(this.has(key)) {
			return this._list[this._list.indexOf(key)+1];
		}
		else {
			return null;
		}
	},

	/**
	 * @returns key from entry previous to given key
	 */
	prevOf : function(key) {
		if(this.has(key)) {
			return this._list[this._list.indexOf(key)-1];
		}
		else {
			return null;
		}
	},
	

	/** return value for given key
	 * 
	 */
	get : function(key) {
		if( this.has(key) ) {
			return this._map[key];
		}
		else {
			return null;
		}
	},
	
	/** return value at given index
	 * 
	 */
	getAt : function(index) {
		return this.get(this._list[index]);
	},
	
	/** Overwrite the value for the given key.
	 * return 
	 *	old value or 
	 *	null, if key not found.
	 * 
	 */
	set : function(key, value) {
		if( this.has(key) ) {
			var oldValue = this._map[key];
			this._map[key] = value;
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
		if(!key || this.has(key) ) {
			//no key or key is used
			return null;
		}
	
		this._map[key] = value;
		if(typeof(targetIndex) !== 'number' || targetIndex < 0 || targetIndex >= this._list.length) {
			//add to end
			this._list.push(key);
			return this._map[key];
		} else {
			//add to target position
			this._list.splice(targetIndex, 0, key);
			return this._map[key];
		}
	},
	
	move : function(key, targetKey) {
		if( !this.has(key) ) {
			return null;
		}
		
		//remove only the key, not the value!
		var index = this._list.indexOf(key);
		this._list.splice(index, 1);
	
		//if targetKey not found, we get -1, that is safe for splice
		var targetIndex = this._list.indexOf(targetKey);
		this._list.splice(targetIndex, 0, key);
		
		return this._map[key];
	},
	
	moveAt : function(index, targetIndex) {
		this.move(this._list[index], this._list[targetIndex]);
	},
	
	/** remove the entry for the given key. 
	 *  value of the removed entry will be returned. 
	 *  If key is null or not found, null will be returned.
	 */
	remove : function(key) {
		if(!this.has(key)) {
			//key is not found
			return null;
		}
	
		var oldValue = this._map[key];
		delete this._map[key];
		var index = this._list.indexOf(key);
		this._list.splice(index, 1);
		
		return oldValue;
	},
	
	removeAt : function(index) {
		return this.remove(this._list[index]);
	}
};

/**
 * make class IndexedMap public
 */
exports = module.exports = IndexedMap;

