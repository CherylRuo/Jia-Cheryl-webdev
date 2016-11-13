/**
 * Created by CherylRuo on 11/9/16.
 */
module.exports = function(mongoose, autoIncrement) {
    var WidgetSchema = require("./widget/widget.schema.server.js")(mongoose);
    WidgetSchema.plugin(autoIncrement.plugin, 'WidgetModel');
    mongoose.model("WidgetModel", WidgetSchema);
    var PageSchema = require("./page/page.schema.server.js")(mongoose);
    PageSchema.plugin(autoIncrement.plugin, 'PageModel');
    mongoose.model("PageModel", PageSchema);
    var WebsiteSchema = require("./website/website.schema.server.js")(mongoose);
    WebsiteSchema.plugin(autoIncrement.plugin, 'WebsiteModel');
    mongoose.model("WebsiteModel", WebsiteSchema);
    var UserSchema = require("./user/user.schema.server.js")(mongoose);
    UserSchema.plugin(autoIncrement.plugin, 'UserModel');
    mongoose.model("UserModel", UserSchema);
};