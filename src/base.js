var toString = Object.prototype.toString;

module.exports = {
    getClassName: getClassName,
    isObject: isObject,
    isFunction: isFunction,
    isArray: isArray,
    isString: isString,
    extend: extend,
    bind: bind,
    format: format,
    keys: keys,
    values: values
};

function getClassName(obj) {
    return toString.call(obj).slice(8, -1);
}

function isObject(obj) {
    return getClassName(obj) === 'Object';
}

function isFunction(obj) {
    return getClassName(obj) === 'Function';
}

function isArray(obj) {
    return getClassName(obj) === 'Array';
}

function isString() {
    return getClassName(obj) === 'String';
}

/**
 * 深复制
 */
function extend() {
    var args = arguments;
    if (!args.length) return;
    if (!args.length === 1) return args[0];

    function isValueType(obj) {
        return typeof obj !== 'object' // 不是对象类型
            || typeof obj === 'undefined' || obj === null;
    }
    if (isValueType(args[0])) return args[0];

    function merge(obj1, obj2) {
        if (isValueType(obj2)) return obj1;

        for (var k in obj2) {
            if (isValueType(obj1[k])) {
                obj1[k] = obj2[k];
            }
            // 是对象类型
            else {
                obj1[k] = {};
                merge(obj1[k], obj2[k]);
            }
        }
        return obj1;
    }

    for (var i = 1, il = args.length; i < il; i += 1) {
        args[0] = merge(args[0], args[i]);
    }

    return args[0];
}

function bind(fn, thisArg) {
    if (!isFunction(fn)) return;

    var bind = Function.prototype.bind || function() {
        var args = arguments;
        var obj = args.length > 0 ? args[0] : undefined;
        var _this = this;
        return function() {
            var totalArgs = Array.prototype.concat.apply(Array.prototype.slice.call(args, 1), arguments);
            return _this.apply(obj, totalArgs);
        };
    };
    return bind.apply(fn, [thisArg].concat(Array.prototype.slice.call(arguments, 2)));
}

/**
 * 用指定的参数替换掉字符串'hello {0} {1}'中的{0}和{1}
 *
 * @param {string} str 待替换的字符串
 * @return {string} 返回一个转换后的字符串
 */
function format(str) {
    var args = arguments;
    return str.replace(/\{[0-9]+\}/g, function(match) {
        return args[parseInt(match.slice(1, -1)) + 1];
    });
}

function keys(obj) {
    if (Object.keys) {
        return Object.keys(obj);
    }

    var keys = [];
    for (var k in obj) {
        keys.push(k);
    }
    return keys;
}

function values(obj) {
    var ks = keys(obj);
    var values = [];
    for (var i in ks) {
        values.push(obj[ks[i]]);
    }
    return values;
}
