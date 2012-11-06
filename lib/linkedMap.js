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
 * The public class LinkedMap
 */
exports = module.exports = function LinkedMap()	{
	
	//be sure, we called with 'new'
	if( !(this instanceof LinkedMap) ) {
		return new LinkedMap(); 
	}


	/**
	 * private hidden class to store key and value
	 */
	var Entry = function(key, value) {
		this.key	= key;
		this.value	= value;
	};
	
	// {Object.<Entry>} intern map to store the value for a key
	var _map = {}; 
	// {Array.<string>} intern array to store the keys in order
	var _list = []; 	
	
	this.length = function() {
		return _list.length;
	};
	
	this.has = function(key) {
		return (key && _map[key]) ? true : false;
	};
	this.sort = function(callback) {
		if(callback) {
			_list.sort(function(a,b) {
				return callback(_map[a], _map[b]);
			});
		} else {
			//sort keys lexicographically
			_list.sort();
		}
	};
	this.revers = function() {
		_list.revers();
	};
	/** return the first key, where callback(key, value) returned true.  
	 * 
	 * @param callback {function(key:string, value:object):boolean}
	 *  - called for every entry in context of list. return true will stop the search and
	 *   return the value of current entry.
	 * @param startIndex {number} - position to start the search
	 * 
	 * @returns key or null
	 */
	this.find = function(callback, startIndex) {
		if(callback) {
			var i = (typeof(startIndex) === number && startIndex > 0) ? startIndex : 0;
			for(; i < _list.length; ++i) {
				if(callback.call(this, _list[i], _map[_list[i]].value) ) {
					return _list[i];
				}
			}
		}
		return null;
	};

	/** return index for key
	 * 
	 */
	this.indexOf = function(key) {
		return _list.indexOf[key];
	};

	/** return key of first entry
	 * 
	 */
	this.first = function() {
		if(_list.length) {
			return _list[0];
		} else {
			return null;
		}
	};
	/** return value of first entry
	 * 
	 */
	this.getFirst = function() {
		if(_list.length) {
			return _map[_list[0]].value;
		} else {
			return null;
		}
	};

	/** return key of last entry
	 * 
	 */
	this.last = function() {
		if(_list.length) {
			return _list[_list.length-1];
		} else {
			return null;
		}
	};
	/** return value of last entry
	 * 
	 */
	this.getLast = function() {
		if(_list.length) {
			return _map[_list[_list.length-1]].value;
		} else {
			return null;
		}
	};
	
	/** return key from next entry referenced by key
	 * 
	 */
	this.next = function(key) {
		if(this.has(key)) {
			return _list[_list.indexOf(key)+1];
		}
		else {
			return null;
		}
	};
	/** return value from next entry referenced by key
	 * 
	 */
	this.getNext = function(key) {
		var nextKey = this.next(key);
		if(nextKey) {
			return _map[nextKey].value;
		} else {
			return null;
		}
	};

	this.get = function(key) {
		if(key && _map[key]) {
			return _map[key].value;
		}
		else {
			return null;
		}
	};
	this.getAt = function(index) {
		return this.get(_list[index]);
	};
	this.getKeyAt = function(index) {
		return _list[index];
	};
	
	/** Overwrite the value for the given key.
	 * return 
	 * 	old value or 
	 * 	null, if key not found.
	 * 
	 */
	this.set = function(key, value) {
		if(key && _map[key]) {
			var oldValue = _map[key].value;
			_map[key].value = value;
			return oldValue;
		}
		else {
			return null;
		}
	};
	this.setAt = function(index, value) {
		return this.set(_list[index], value);
	};
	
	/** Insert new element before the referenced element targetKey.
	 *  If reference is null or not found, new element is inserted at the end
	 *  of the list.
	 *  If key always used in the map, null will be returned.
	 * 
	 */
	this.insert = function(key, value, targetKey) {
		return this.insertAt(key, value, _list.indexOf(targetKey));
	};
	this.insertAt = function(key, value, targetIndex) {
		if(!key || _map[key]) {
			//no key or key is used
			return null;
		}

		_map[key] = new Entry(key, value);
		if(targetIndex < 0 || targetIndex >= _list.length) {
			//add to end
			_list.push(key);
			return _map[key].value;
		} else {
			//add to target position
			_list.slice(targetIndex, 0, key);
			return _map[key].value;
		}
	};

	this.move = function(key, targetKey) {
		if(!key || !_map[key]) {
			return null;
		};
		
		var key = _list.slice(index, 1)[0];//remove key
		var targetIndex = _list.indexOf(targetKey);//if key not found, we get -1, that is safe for slice
		_list.slice(targetIndex, 0, key);
	};
	this.moveAt = function(index, targetIndex) {
		this.move(_list[index], _list[targetIndex]);
	};
	
	/** remove the entry for the given key. 
	 *  value of the removed entry will be returned. 
	 *  If key is null or not found, null will be returned. 	 * 
	 */
	this.remove = function(key) {
		if(!_map[key]) {
			//key is not found
			return null;
		}

		var oldValue = _map[key].value;
		delete _map[key];
		var index = _list.indexOf(key);
		_list.slice(index, 1);
		
		return oldValue;
	};
	this.removeAt = function(index) {
		return this.remove(_list[index]);
	};

};
