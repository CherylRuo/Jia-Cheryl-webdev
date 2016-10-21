/**
 * Created by CherylRuo on 10/7/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)
    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm  = this;
        var userId  = parseInt($routeParams.uid);
        var websiteId = parseInt($routeParams.wid);
        var pageId  = parseInt($routeParams.pid);
        vm.widgets = WidgetService.findWidgetsByPageId(pageId);
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
        var widgets = WidgetService.findWidgetsByPageId(pageId);
        if(widgets != null) {
            vm.widgets = widgets;
        }
        vm.createWidget = createWidget;
        function createWidget(widget) {
            WidgetService.createWidget(vm.pageId, widget);
            $location.url("/user/"+ userId +"/website/" + websiteId + "/page/" + pageId + "/widget");
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

        var widget = WidgetService.findWidgetById(widgetId);
        if(widget != null) {
            vm.widget = widget;
        }

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        function updateWidget(updateWidget) {
            WidgetService.updateWidget(pageId, updateWidget);
            $location.url("/user/"+ userId +"/website/" + websiteId + "/page/" + pageId + "/widget");
        }
        function deleteWidget() {
            WidgetService.deleteWidget(widgetId);
            $location.url("/user/"+ userId +"/website/" + websiteId + "/page/" + pageId + "/widget");
        }
        vm.pageId = pageId;
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.widgetId = widgetId;
    }
})();