/**
 * Created by CherylRuo on 11/9/16.
 */
module.exports = function(mongoose) {
    var Website = mongoose.Schema({
        _user: {type: Number, ref: 'UserModel'},
        name: String,
        description: String,
        pages: [{type: Number, ref: 'PageModel'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "website"});
    return Website;
};