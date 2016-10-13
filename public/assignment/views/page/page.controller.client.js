/**
 * Created by CherylRuo on 10/7/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController)
    function PageListController($routeParams, WebsiteService) {
        var vm = this;
        vm.websiteId = $routeParams["websiteId"];
        function init() {
            vm.pages = WebsiteService.findPageByWebsiteId(websiteId);
        }
        init();
    }

    function NewPageController($routeProvider, WebsiteService) {
        var vm = this;
        vm.websiteId = $routeProvider.websiteId;
        vm.createPage = createPage;
        function createPage(page) {
            WebsiteService.createPage(vm.websiteId, page);
        }
    }

    function EditPageController($routeProvider, WebsiteService) {
        var vm = this;
        vm.pageId = $routeProvider.pageId;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        function updatePage(page) {
            WebsiteService.updatePage(vm.pageId, page);
        }
        function deletePage() {
            WebsiteService.deletePage(vm.pageId);
        }
    }
})();