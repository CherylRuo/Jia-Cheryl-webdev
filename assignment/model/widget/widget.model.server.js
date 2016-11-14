/**
 * Created by CherylRuo on 11/9/16.
 */
var q = require("q");

module.exports = function (db, mongoose) {
    var WidgetModel = mongoose.model('WidgetModel');
    var PageModel = mongoose.model('PageModel');

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
        console.log("Create a widget.");
        widget._page = pageId;

        WidgetModel.create(widget, function (err, widget) {
            PageModel.findById(pageId, function (err, page) {
                page.widgets.push(widget._id);
                page.save(function () {
                    deferred.resolve(widget);
                });
            });
        });

        return deferred.promise;
    }

    function findAllWidgetsForPage(pageId) {
        var deferred = q.defer();

        PageModel.findById(pageId, function (err, page) {
            if (err) {
                deferred.reject(err);
            } else {
                var widgetIds = page.widgets;
                console.log(widgetIds);
                WidgetModel.find({
                    '_id': { $in: widgetIds}
                }, function(err, widgets){
                    widgets.sort(function(a, b) {
                        // Sort widgets by the order of their _id values in ids.
                        return widgetIds.indexOf(a._id) - widgetIds.indexOf(b._id);
                    });
                    console.log(widgets);
                    deferred.resolve(widgets);
                });
            }
        });

        return deferred.promise;
    }

    function findWidgetById(widgetId) {
        var deferred = q.defer();

        WidgetModel.findById({_id: widgetId}, function (err, widget) {
            if (err) {
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

        WidgetModel.update({_id: widgetId}, {$set: widget}, function (err, widget) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(widget);
            }
        });

        return deferred.promise;
    }

    function deleteWidget(widgetId) {
        var deferred = q.defer();
        WidgetModel.findById(widgetId, function (err, widget) {
            if (err) {
                deferred.reject(err);
            } else {
                var pageId = widget._page;
                WidgetModel.remove({_id: widgetId}, function (err, status) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(status);
                        PageModel.findById(pageId, function (err, page) {
                            var widgets = page.widgets;
                            for (var i = widgets.length - 1; i > 0; i--) {
                                if (widgets[i] == widgetId)
                                    widgets.splice(i, 1);
                            }
                            page.save(function () {});
                        });
                    }
                });
            }
        });

        return deferred.promise;
    }

    function reorderWidget(pageId, start, end) {
        var deferred = q.defer();
        PageModel.findById(pageId, function (err, page) {
            if(err) {
                deferred.reject(err);
            } else {
                var widgetIds = page.widgets;
                var element = widgetIds[start];
                widgetIds.splice(start, 1);
                widgetIds.splice(end, 0, element);
                page.widgets = widgetIds;
                page.save(function () {});
            }
        });
        return deferred.promise;
    }
};

