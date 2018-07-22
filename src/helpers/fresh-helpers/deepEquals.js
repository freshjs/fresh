/**
 * [description]
 * @method
 * @param  {[type]} n1 [description]
 * @param  {[type]} n2 [description]
 * @return {[type]}    [description]
 *
 * @reference https://gomakethings.com/check-if-two-arrays-or-objects-are-equal-with-javascript/
 */
export default function(n1, n2) {
    // Get the value type
	var type = Object.prototype.toString.call(n1);

	// If the two objects are not the same type, return false
	if (type !== Object.prototype.toString.call(n2)) return false;
    
    // If items are not an object or array, return false
	if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;
    
    // Compare the length of the length of the two items
	var len1 = type === '[object Array]' ? value.length : Object.keys(n1).length;
	var len2 = type === '[object Array]' ? other.length : Object.keys(n2).length;
	if (len1 !== len2) return false;
    
    // Compare two items
	const compare = (item1, item2) => {
        // Get the object type
    	const itemType = Object.prototype.toString.call(item1);

    	// If an object or array, compare recursively
    	if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
    		if (!isEqual(item1, item2)) return false;
    	} else {
        // Otherwise, do a simple comparison
    		// If the two items are not the same type, return false
    		if (itemType !== Object.prototype.toString.call(item2)) return false;
            
            // If it's a function, convert to a string and compare
        	// Otherwise, just compare
        	if (itemType === '[object Function]') {
        		if (item1.toString() !== item2.toString()) return false;
        	} else {
        		if (item1 !== item2) return false;
        	}
    	}
	};
    
    // Compare properties
	if (type === '[object Array]') {
		for (var i = 0; i < len1; i++) {
			if (compare(n1[i], n2[i]) === false) return false;
		}
	} else {
		for (var key in n1) {
			if (n1.hasOwnProperty(key)) {
				if (compare(n1[key], n2[key]) === false) return false;
			}
		}
	}
    
    // return true if it passes
    return true;
}