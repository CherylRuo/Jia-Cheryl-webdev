/**
 * Created by CherylRuo on 10/7/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)
    function WidgetListController($routeParams, WebsiteService) {
        var vm = this;
        vm.pageId = $routeParams["pageId"];
        function init() {
            vm.widgets = WebsiteService.findWidgetsByPageId(pageId);
        }
        init();
    }

    function NewWidgetController($routeProvider, WebsiteService) {
        var vm = this;
        vm.pageId = $routeProvider.pageId;
        vm.createPage = createPage;
        function createPage(widget) {
            WebsiteService.createPage(vm.pageId, widget);
        }
    }

    function EditWidgetController($routeProvider, WebsiteService) {
        var vm = this;
        vm.widgetId = $routeProvider.widgetId;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        function updateWidget(widget) {
            WebsiteService.updateWidget(vm.widgetId, widget);
        }
        function deleteWidget() {
            WebsiteService.deleteWidget(vm.widgetId);
        }
    }
})();