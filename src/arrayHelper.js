// 依赖
var base = require('./base.js');

module.exports = {
    reduce: reduce,
    map: map,
    filter: filter,
    forEach: forEach,
    some: some,
    distinctArray: distinctArray,
    every: every,
    groupBy: groupBy
};

function reduce(arr, callback, initialValue) {
    if (!base.isArray(arr)) return;

    var reduce = Array.prototype.reduce || function(callback, initialValue) {
        if (!base.isFunction(callback)) return;

        var arr = initialValue ? Array.prototype.concat.call(this, initialValue) : this;
        if (arr.length < 2) return initialValue;

        var previousValue = arr[0];
        for (var i = 1, len = arr.length; i < len; i += 1) {
            previousValue = callback(previousValue, this[i], i, this);
        }
        return previousValue;
    };
    return reduce.call(arr, callback, initialValue);
}

function map(arr, fn, thisArg) {
    if (!base.isArray(arr) || !base.isFunction(fn)) return arr;

    var map = Array.prototype.map || function(fn, thisArg) {
        var newArr = [];
        for (var i in this) {
            newArr.push(fn.call(thisArg, this, this[i], i, this));
        }
        return newArr;
    };

    return map.call(arr, fn, thisArg);
}

function filter(arr, fn, thisArg) {
    if (!base.isArray(arr) || !base.isFunction(fn)) return arr;

    var filter = Array.prototype.filter || function(fn, thisArg) {
        var newArr = [];
        for (var i in this) {
            if (fn.call(thisArg, this, this[i], i, this)) newArr.push(this[i]);
        }
        return newArr;
    };

    return filter.call(arr, fn, thisArg);
}

function forEach(arr, fn, thisArg) {
    if (!base.isArray(arr) || !base.isFunction(fn)) return;

    var forEach = Array.prototype.forEach || function(fn, thisArg) {
        for (var i in this) {
            fn.call(thisArg, this, this[i], i, this);
        }
    };

    forEach.call(arr, fn, thisArg);
}

function some(arr, fn, thisArg) {
    if (!base.isArray(arr) || !base.isFunction(fn)) return;

    var some = Array.prototype.some || function(fn, thisArg) {
        for (var i in arr) {
            if (fn.call(thisArg, this, this[i], i, this)) return true;
        }
        return false;
    };

    return some.call(arr, fn, thisArg);
}

function every(arr, fn, thisArg) {
    if (!base.isArray(arr) || !base.isFunction(fn)) return;

    var every = Array.prototype.every || function(fn, thisArg) {
        for (var i in arr) {
            if (!fn.call(thisArg, this, this[i], i, this)) return false;
        }
        return true;
    };

    return every.call(arr, fn, thisArg);
}

/**
 * 去除数组中的重复元素
 * mergeFn 是合并的函数，指定当前元素和之前元素相同的情况下如何合并
 */
function distinctArray(array, hashFn, mergeFn) {
    if (!base.isFunction(hashFn)) throw new Error('need a hash function to compare each element');
    var compareMap = {};
    for (var i in array) {
        var item = array[i];
        var hash = hashFn(item);
        if (compareMap[hash] && base.isFunction(mergeFn)) {
            compareMap[hash] = mergeFn(compareMap[hash], item);
        } else {
            compareMap[hash] = item;
        }
    }
    return base.values(compareMap);
}

function groupBy(arr, keyFn) {
    if (!base.isArray(arr)) throw TypeError('the first argument must be an array');
    if (!base.isFunction(keyFn)) throw TypeError('the second argument must be a Function');

    var obj = {};
    for (var i in arr) {
        var key = keyFn(arr[i], i, arr);
        obj[key] = obj[key] || [];
        obj[key].push(arr[i]);
    }
    return obj;
}
