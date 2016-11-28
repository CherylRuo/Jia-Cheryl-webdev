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
        var promise = PageService.findAllPagesForWebsite(websiteId);
        promise.then(
            function(response) {
                vm.pages = response.data;
            },
            function (httpError) {
                vm.error = "Cannot find page for this website."
            });
        vm.userId = userId;
        vm.websiteId = websiteId;
    }

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        var websiteId = parseInt($routeParams.wid);
        var userId = parseInt($routeParams.uid);
        var promise = PageService.findAllPagesForWebsite(websiteId);
        promise.then(
            function(response) {
                vm.pages = response.data;
            },
            function (httpError) {
                vm.error = "Cannot find page for this website."
            });
        vm.createPage = createPage;
        function createPage(page) {
            if(page == null) {
                vm.alert = "Please create a new page.";
                return;
            }
            var promise = PageService.createPage(vm.websiteId, page);
            promise.then(
                function(response) {
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page");
                },
                function (httpError) {
                    vm.error = "Cannot create page."
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
        var promise = PageService.findAllPagesForWebsite(websiteId);
        promise.then(
            function(response) {
                vm.pages = response.data;
            },
            function (httpError) {
                vm.error = "Cannot find page for this website."
            });
        var promise1 = PageService.findPageById(pageId);
        promise1.then(
            function(response){
                vm.page = response.data;
            },
            function (httpError) {
                vm.error = "Cannot find page."
            });
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        function updatePage(updatePage) {
            var promise = PageService.updatePage(pageId, updatePage);
            promise.then(
                function(response) {
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page");
                },
                function (httpError) {
                    vm.error = "Cannot update page."
                });
        }
        function deletePage() {
            var promise = PageService.deletePage(pageId);
            promise.then(
                function(response) {
                    $location.url("/user/" + userId + "/website/" + websiteId +"/page");
                },
                function (httpError) {
                    vm.error = "Cannot delete page."
                });
        }
        vm.pageId = pageId;
        vm.websiteId = websiteId;
        vm.userId = userId;
    }
})();