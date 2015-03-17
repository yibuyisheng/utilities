var strMap = {
    yyyy: function(dt) {
        return dateGetter(Date.prototype.getFullYear, dt);
    },
    MM: function(dt) {
        return fill(dateGetter(Date.prototype.getMonth, dt) + 1, 2);
    },
    dd: function(dt) {
        return fill(dateGetter(Date.prototype.getDate, dt), 2);
    },
    HH: function(dt) {
        return fill(dateGetter(Date.prototype.getHours, dt), 2);
    },
    mm: function(dt) {
        return fill(dateGetter(Date.prototype.getMinutes, dt), 2);
    },
    ss: function(dt) {
        return fill(dateGetter(Date.prototype.getSeconds, dt), 2);
    }
};

module.exports = {
    format: dateFormat
};

function fill(num, len) {
    var numStr = String(num);
    while (numStr.length < len) {
        numStr = '0' + numStr;
    }
    return numStr;
}

function dateGetter(fn, dt) {
    return fn.call(dt);
}

function dateFormat(dt, formatStr) {
    return formatStr.replace(/(y{4})|([M|d|H|m|s]{2})/g, function(match) {
        return strMap[match](dt);
    });
}
