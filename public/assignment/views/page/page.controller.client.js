/**
 * Created by CherylRuo on 10/7/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController)
    function PageListController($routeParams, PageService) {
        var vm = this;
        var websiteId = parseInt($routeParams['wid']);
        var userId = parseInt($routeParams['uid']);
        vm.pages = PageService.findPageByWebsiteId(websiteId);
        vm.userId = userId;
        vm.websiteId = websiteId;
    }

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        var websiteId = parseInt($routeParams['wid']);
        var userId = parseInt($routeParams['uid']);
        var page = PageService.findPageByWebsiteId(websiteId);
        if(page != null) {
            vm.page = page;
        }
        vm.createPage = createPage;
        function createPage(page) {
            PageService.createPage(vm.websiteId, page);
            $location.url("/user/"+ userId +"/website/" + websiteId + "/page");
        }
    }

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        var pageId = parseInt($routeParams.pid);
        var userId = parseInt($routeParams.uid);
        var websiteId = parseInt($routeParams.wid);
        var page = PageService.findPageByWebsiteId(websiteId);
        if(page != null) {
            vm.page = page;
        }
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        function updatePage(updatePage) {
            PageService.updatePage(pageId, updatePage);
            $location.url("/user/" + userId + "/website/" + websiteId +"/page");
        }
        function deletePage() {
            PageService.deletePage(pageId);
        }
    }
})();