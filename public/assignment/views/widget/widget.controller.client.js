/**
 * Created by CherylRuo on 10/7/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm  = this;
        var userId  = parseInt($routeParams.uid);
        var websiteId = parseInt($routeParams.wid);
        var pageId  = parseInt($routeParams.pid);
        var promise = WidgetService.findAllWidgetsForPage(pageId);
        promise.then(
            function(response) {
                vm.widgets = response.data;
            },
            function (httpError) {
                throw httpError.status + " : " + httpError.data;
            });
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;

        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;
        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }
        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        var websiteId = parseInt($routeParams.wid);
        var userId = parseInt($routeParams.uid);
        var pageId = parseInt($routeParams.pid);
        var promise = WidgetService.findAllWidgetsForPage(pageId);
        promise.then(
            function(response){
                vm.widgets = response.data;
            },
            function (httpError) {
                throw httpError.status + " : " + httpError.data;
            });
        vm.createWidget = createWidget;
        function createWidget(widget) {
            if(widget == null) {
                vm.alert = "Please create a new widget.";
                return;
            }
            var promise = WidgetService.createWidget(vm.pageId, widget);
            promise.then(
                function(response){
                    $location.url("/user/"+ userId +"/website/" + websiteId + "/page/" + pageId + "/widget");
                },
                function (httpError) {
                    throw httpError.status + " : " + httpError.data;
                });
        }
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.pageId = pageId;
    }

    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        var websiteId = parseInt($routeParams.wid);
        var userId = parseInt($routeParams.uid);
        var pageId = parseInt($routeParams.pid);
        var widgetId = parseInt($routeParams.wgid);
        vm.pageId = pageId;
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.widgetId = widgetId;
        var promise = WidgetService.findAllWidgetsForPage(pageId);
        promise.then(
            function(response){
                vm.widgets = response.data;
            },
            function (httpError) {
                throw httpError.status + " : " + httpError.data;
            });
        var promise1 = WidgetService.findWidgetById(widgetId);
        promise1.then(
            function(response){
                vm.widget = response.data;
            },
            function (httpError) {
                throw httpError.status + " : " + httpError.data;
            });
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        function updateWidget(updateWidget) {
            var promise = WidgetService.updateWidget(widgetId, updateWidget);
            promise.then(
                function(response){
                    $location.url("/user/"+ userId +"/website/" + websiteId + "/page/" + pageId + "/widget");
                },
                function (httpError) {
                    throw httpError.status + " : " + httpError.data;
                });
        }
        function deleteWidget() {
            var promise = WidgetService.deleteWidget(widgetId);
            promise.then(
                function(response){
                    $location.url("/user/"+ userId +"/website/" + websiteId + "/page/" + pageId + "/widget");
                },
                function (httpError) {
                    throw httpError.status + " : " + httpError.data;
                });

        }
    }
})();