var sequence = require("when/sequence");
var models = require("./api/express/models");

var pairs = [
    ["John", "яблоко"],
    ["William", "груша"],
    ["Richard", "апельсин"]
];

module.exports = function () {

    var noop = function () {}

    var addToQueue = function (cb) {
        queue.push(cb);
    }

    var queue = [];

    models.Message.destroy({ truncate: true }).then(function () {
        addToQueue(noop);
    });

    pairs.forEach(function (pair) {
        models.Message.create({
            userId: pair[0],
            text: pair[1]
        }).then(function (res) {
            addToQueue(noop);
        });
    });

    return sequence(queue);
}