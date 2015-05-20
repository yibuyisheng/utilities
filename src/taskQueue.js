var base = require('./base.js');
var eventDealer = require('./eventDealer.js');

function Queue() {}

Queue.prototype = base.extend({
    add: function() {
        this._datas = this._datas || [];
        this._datas.unshift(data);

        start(this);
    },
    setInterval: function(interval) {
        this._interval = interval;
    }
}, eventDealer);

function start(queue) {
    if (queue._isStarted) return;
    queue._isStarted = true;

    deal(queue._datas.shift());
}

function deal(queue, data) {
    queue.trigger('deal', data);
    if (queue._datas.length) {
        setTimeout(function() {
            deal(queue, queue._datas.shift());
        }, queue._interval || 1000);
    } else {
        queue._isStarted = false;
    }
}

module.exports = queue;