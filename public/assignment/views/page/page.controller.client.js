/**
 * Created by CherylRuo on 10/7/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);
    function PageListController($routeParams, PageService) {
        var vm = this;
        var websiteId = parseInt($routeParams.wid);
        var userId = parseInt($routeParams.uid);
        PageService.findAllPagesForWebsite(websiteId, function(response) {
            vm.pages = response;
        });
        vm.userId = userId;
        vm.websiteId = websiteId;
    }

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        var websiteId = parseInt($routeParams.wid);
        var userId = parseInt($routeParams.uid);
        PageService.findAllPagesForWebsite(websiteId, function(response) {
            vm.pages = response;
        });
        vm.createPage = createPage;
        function createPage(page) {
            if(page == null) {
                vm.alert = "Please create a new page.";
                return;
            }
            PageService.createPage(vm.websiteId, page, function(response) {
                $location.url("/user/" + userId + "/website/" + websiteId + "/page");
            });
        }
        vm.websiteId = websiteId;
        vm.userId = userId;
    }

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        var pageId = parseInt($routeParams.pid);
        var userId = parseInt($routeParams.uid);
        var websiteId = parseInt($routeParams.wid);
        PageService.findAllPagesForWebsite(websiteId, function(response) {
            vm.pages = response;
        });
        PageService.findPageById(pageId, function(response) {
            vm.page = response;
        });
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        function updatePage(updatePage) {
            PageService.updatePage(pageId, updatePage, function(response) {
                $location.url("/user/" + userId + "/website/" + websiteId +"/page");
            });
        }
        function deletePage() {
            PageService.deletePage(pageId, function(response) {
                $location.url("/user/" + userId + "/website/" + websiteId +"/page");
            });
        }
        vm.pageId = pageId;
        vm.websiteId = websiteId;
        vm.userId = userId;
    }
})();