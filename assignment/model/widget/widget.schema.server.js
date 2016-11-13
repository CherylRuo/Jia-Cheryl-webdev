/**
 * Created by CherylRuo on 11/9/16.
 */
module.exports = function(mongoose) {
    var Widget = mongoose.Schema({
        _page: {type: Number, ref: 'PageModel'},
        type: String, //enum
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "widget"});
    return Widget;
};