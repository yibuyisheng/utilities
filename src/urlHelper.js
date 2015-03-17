var base = require('./base.js');

module.exports = {
    getParams: getParams,
    buildUrl: buildUrl,
    renderToHref: renderToHref,
    encode: encode
};

// 将str字符串中的url转换成带a标签的链接
function renderToHref(str) {
    return str.replace(/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|\&|-)+)/g, function() {
        var url = arguments[0];
        return '<a href="' + url + '">' + url + '</a>';
    });
}

function getParams(url) {
    var search = url.split('?');
    if (search.length <= 1) {
        return {};
    }
    search = search[1];

    return _decode(search);
}

function buildUrl(url, params) {
    var params = base.extend(getParams(url), params);

    return url.split('?')[0] + '?' + encode(params);
}

function encode(params) {
    var result = [];
    for (var k in params) {
        result.push(encodeURIComponent(k) + '=' + encodeURIComponent(params[k]));
    }

    return result.join('&');
}

function _decode(search) {
    if (!search) return {};

    var searchSplit = search.split('&');
    var result = {};
    for (var i in searchSplit) {
        var param = searchSplit[i].split('=');
        if (param.length !== 2) continue;
        result[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
    }
    return result;
}
