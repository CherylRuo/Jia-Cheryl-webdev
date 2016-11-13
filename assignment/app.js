/**
 * Created by CherylRuo on 10/27/16.
 */
module.exports = function(app) {
    var connectionString = 'mongodb://127.0.0.1:27017/CS5610';

    var mongoose = require("mongoose");
    var autoIncrement = require('mongoose-auto-increment');
    var connection = mongoose.createConnection(connectionString);
    autoIncrement.initialize(connection);

    var db = connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("we're connected!");
    });

    require("./model/models.server.js")(mongoose, autoIncrement);
    var userModel = require("./model/user/user.model.server.js")(mongoose, db);
    require("./services/user.service.server.js")(app, userModel);

    var websiteModel = require("./model/website/website.model.server.js")(mongoose, db);
    require("./services/website.service.server.js")(app, websiteModel);

    var pageModel = require("./model/page/page.model.server.js")(mongoose, db);
    require("./services/page.service.server.js")(app, pageModel);

    var widgetModel = require("./model/widget/widget.model.server.js")(mongoose, db);
    require("./services/widget.service.server.js")(app, widgetModel);
};