// 依赖
var base = require('./base.js');

var reduce = Array.prototype.reduce
    ? _call(Array.prototype.reduce)
    : function(arr, callback, initialValue) {
        _isArray(arr);

        var arr = initialValue ? Array.prototype.concat.call(arr, initialValue) : arr;
        if (arr.length < 2) return initialValue;

        var previousValue = arr[0];
        for (var i = 1, il = arr.length; i < il; i++) {
            previousValue = callback(previousValue, arr[i], i, arr);
        }

        return previousValue;
    };

var map = Array.prototype.map
    ? _call(Array.prototype.map)
    : function(arr, fn, thisArg) {
        _isArray(arr);

        var newArr = [];
        for (var i = 0, il = arr.length; i < il; i++) {
            newArr.push(fn.call(thisArg, arr[i], i, arr));
        }

        return newArr;
    };

var filter = Array.prototype.filter
    ? _call(Array.prototype.filter)
    : function(arr, fn, thisArg) {
        _isArray(arr);

        var newArr = [];
        for (var i = 0, il = arr.length; i < il; i++) {
            if (fn.call(thisArg, arr[i], i, arr)) newArr.push(arr[i]);
        }
        return newArr;
    };

var forEach = Array.prototype.forEach
    ? _call(Array.prototype.forEach)
    : function(arr, fn, thisArg) {
        _isArray(arr);

        for (var i = 0, il = arr.length; i < il; i++) {
            fn.call(thisArg, arr[i], i, arr);
        }
    };

var some = Array.prototype.some
    ? _call(Array.prototype.some)
    : function(arr, fn, thisArg) {
        _isArray(arr);

        for (var i = 0, il = arr.length; i < il; i++) {
            if (fn.call(thisArg, arr[i], i, arr)) return true;
        }
        return false;
    };

var every = Array.prototype.every
    ? _call(Array.prototype.every)
    : function(arr, fn, thisArg) {
        _isArray(arr);

        for (var i = 0, il = arr.length; i < il; i++) {
            if (!fn.call(thisArg, arr[i], i, arr)) return false;
        }
        return true;
    };

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

/**
 * TODO: 链式调用
 */
function chain(arr) {

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

function _isArray(arr) {
    if (!base.isArray(arr)) throw new TypeError('the first argument must be an Array');
}

function _call(method) {
    return function(arr, fn, thisArg) {
        method.call(arr, fn, thisArg);
    };
}
