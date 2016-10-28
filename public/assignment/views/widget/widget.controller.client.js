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
        WidgetService.findAllWidgetsForPage(pageId, function(response) {
            vm.widgets = response;
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
        WidgetService.findAllWidgetsForPage(pageId, function(response) {
            vm.widgets = response;
        });
        vm.createWidget = createWidget;
        function createWidget(widget) {
            if(widget == null) {
                vm.alert = "Please create a new widget.";
                return;
            }
            WidgetService.createWidget(vm.pageId, widget, function(response) {
                $location.url("/user/"+ userId +"/website/" + websiteId + "/page/" + pageId + "/widget");
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
        var widget = null;
        WidgetService.findAllWidgetsForPage(pageId, function(response) {
            vm.widgets = response;
        });
        WidgetService.findWidgetById(widgetId, function(response) {
            vm.widget = response;
        });
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        function updateWidget(updateWidget) {
            WidgetService.updateWidget(pageId, updateWidget, function(response) {
                $location.url("/user/"+ userId +"/website/" + websiteId + "/page/" + pageId + "/widget");
            });
        }
        function deleteWidget() {
            WidgetService.deleteWidget(widgetId, function(response) {
                $location.url("/user/"+ userId +"/website/" + websiteId + "/page/" + pageId + "/widget");

            });
        }
        vm.pageId = pageId;
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.widgetId = widgetId;
    }
})();