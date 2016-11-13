/**
 * Created by CherylRuo on 10/7/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService($http) {
        var api = {
            createWidget : createWidget,
            findAllWidgetsForPage : findAllWidgetsForPage,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget,
            updateImage : updateImage,
            sort : sort
        };
        return api;
        function sort(start, end, pageId) {
            var url = "/api/page/" + pageId + "/widget?start=START&end=END";
            url = url.replace("START", start)
                .replace("END", end);
            return $http.put(url);
        }

        function createWidget(pageId, widget) {
            return $http
                .post("/api/page/" + pageId + "/widget", widget)
        }

        function findAllWidgetsForPage(pageId) {
            return $http
                .get("/api/page/" + pageId + "/widget")
        }

        function findWidgetById(widgetId) {
            return $http
                .get("/api/widget/"+ widgetId)
        }

        function updateWidget(widgetId, widget) {
            return $http
                .put("/api/widget/" + widgetId, widget)
        }

        function updateImage(widgetId, url) {
            return $http
                .put("/api/widget/" + widgetId, url)
        }

        function deleteWidget(widgetId) {
            return $http
                .delete("/api/widget/" + widgetId)
        }
    }
})();