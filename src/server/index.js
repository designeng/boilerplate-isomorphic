require('babel-core/register');

var models = require("./api/express/models");
var initialize = require('./initialize');

models.sequelize.sync().then(function () {
    initialize().then(require('./core'));
});