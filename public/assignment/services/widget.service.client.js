/**
 * Created by CherylRuo on 10/7/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService($http) {
        var api = {
            createWidget   : createWidget,
            findAllWidgetsForPage : findAllWidgetsForPage,
            findWidgetById   : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget
        };
        return api;

        function createWidget(pageId, widget, callback) {
            $http
                .post("/api/page/" + pageId + "/widget", widget)
                .success(callback);
        }

        function findAllWidgetsForPage(pageId, callback) {
            $http
                .get("/api/page/" + pageId + "/widget")
                .success(callback);
        }

        function findWidgetById(widgetId, callback) {
            $http
                .get("/api/widget/"+ widgetId)
                .success(callback);
        }

        function updateWidget(widgetId, widget, callback) {
            $http
                .put("/api/widget/" + widgetId, widget)
                .success(callback);
        }

        function deleteWidget(widgetId, callback) {
            $http
                .delete("/api/widget/" + widgetId)
                .success(callback);
        }
    }
})();