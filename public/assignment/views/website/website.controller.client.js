/**
 * Created by CherylRuo on 10/7/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController)
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        vm.websites = WebsiteService.findWebsitesByUser(userId);
        vm.userId = userId;
    }

    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        vm.websites = WebsiteService.findWebsitesByUser(userId);
        vm.userId = userId;
        vm.createWebsite = createWebsite;
        function createWebsite(website) {
            WebsiteService.createWebsite(vm.userId, website);
        }

    }

    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.websiteId = $routeProvider.websiteId;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website);
        }
        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
        }
    }
})();