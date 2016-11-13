/**
 * Created by CherylRuo on 11/9/16.
 */
var q = require("q");

module.exports = function(db, mongoose) {
    var WidgetModel  = mongoose.model('WidgetModel');
    var PageModel  = mongoose.model('PageModel');

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };
    return api;

    function createWidget(pageId, widget) {
        var deferred = q.defer();
        console.log("Create a page.");
        widget._page = pageId;

        WidgetModel.create(widget, function(err, widget) {
            PageModel.findById(pageId, function (err, page) {
                page.widgets.push(widget);
                page.save(function (err, widget) {
                    deferred.resolve(widget);
                });
            });
        });

        return deferred.promise;
    }

    function findAllWidgetsForPage(pageId) {
        var deferred = q.defer();

        WidgetModel.find({_page: pageId}, function(err, widget){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(widget);
            }
        });

        return deferred.promise;
    }

    function findWidgetById(widgetId) {
        var deferred = q.defer();

        WidgetModel.findById({widgetId: widgetId}, function(err, widget){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(widget);
            }
        });

        return deferred.promise;
    }

    function updateWidget(widgetId, widget) {
        var deferred = q.defer();

        // widget.delete("_id");

        WidgetModel.update({_id: widgetId}, {$set: widget}, function(err, widget) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(widget);
            }
        });

        return deferred.promise;
    }

    function deleteWidget(widgetId) {
        var deferred = q.defer();

        WidgetModel.remove({_id: widgetId}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }

    function reorderWidget(pageId, start, end) {
        var deferred = q.defer();

        WidgetModel.remove({pageId: pageId, start: start, end: end}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }
};

