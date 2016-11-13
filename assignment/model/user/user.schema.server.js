/**
 * Created by CherylRuo on 11/9/16.
 */
module.exports = function(mongoose) {
    var User = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: Number, ref: 'WebsiteModel'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "user"});
    return User;
};