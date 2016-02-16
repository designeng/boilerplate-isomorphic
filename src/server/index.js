require('babel-core/register');

// require('./core');

var models = require("./api/express/models");

var initialize = require('./initialize');

models.sequelize.sync().then(function () {
    initialize().then();
});