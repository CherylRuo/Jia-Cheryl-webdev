/**
 * Created by CherylRuo on 10/7/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService() {
        var widgets = [
            { _id: 123, widgetType: "HEADER", pageId: 246, size: 2, text: "GIZMODO"},
            { _id: 234, widgetType: "HEADER", pageId: 321, size: 4, text: "Lorem ipsum"},
            { _id: 345, widgetType: "IMAGE", pageId: 246, text: "image", width: "100%",
                url: "https://pbs.twimg.com/profile_images/749999977145987073/TIBx9FL__400x400.jpg"},
            { _id: 456, widgetType: "HTML", pageId: 246, text: "<p>Lorem ipsum</p>"},
            { _id: 567, widgetType: "HEADER", pageId: 321, size: 4, text: "Lorem ipsum"},
            { _id: 678, widgetType: "YOUTUBE", pageId: 246, text: "youtube", width: "100%",
                url: "https://youtu.be/AM2Ivdi9c4E" },
            { _id: 135, widgetType: "HTML", pageId: 222, text: "<p>Lorem ipsum</p>"},
            { _id: 234, widgetType: "HTML", pageId: 259, text: "<p>Lorem ipsum</p>"}

        ];
        var api = {
            createWidget   : createWidget,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById   : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            var id = Math.floor(Math.random()*900)+100;
            while(findWidgetById(id) != null) {
                id = Math.floor(Math.random()*900)+100;
            }
            widget._id = id;
            widget.pageId = pageId;
            widgets.push(widget);
            return widget._id;
        }

        function findWidgetsByPageId(pageId) {
            var result = [];
            for(var i=0; i<widgets.length; i++) {
                if(widgets[i].pageId === pageId) {
                    result.push(widgets[i]);
                }
            }
            return result;
        }

        function findWidgetById(widgetId) {
            for(var i=0; i<widgets.length; i++) {
                if(widgets[i]._id === widgetId) {
                    return widgets[i];
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for(var i=0; i<widgets.length; i++) {
                if(widgets[i]._id === widgetId) {
                    widgets[i] = widget;
                }
            }
        }

        function deleteWidget(widgetId) {
            for(var i=0; i<widgets.length; i++) {
                if (widgets[i]._id === widgetId) {
                    widgets.splice(i, 1);
                }
            }
        }
    }
})();