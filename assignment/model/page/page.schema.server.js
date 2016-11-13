/**
 * Created by CherylRuo on 11/9/16.
 */
module.exports = function(mongoose) {
    var Page = mongoose.Schema({
        _website: {type: Number, ref: 'WebsiteModel'},
        name: String,
        title: String,
        description: String,
        widgets: [{type: Number, ref: 'WidgetModel'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "page"});
    return Page;
};