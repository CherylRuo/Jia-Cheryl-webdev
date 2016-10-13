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
        vm.userId = $routeParams["userId"];
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
        }
        init();
    }

    function NewWebsiteController($routeProvider, WebsiteService) {
        var vm = this;
        vm.userId = $routeProvider.userId;
        vm.createWebsite = createWebsite;
        function createWebsite(website) {
            WebsiteService.createWebsite(vm.userId, website);
        }
    }

    function EditWebsiteController($routeProvider, WebsiteService) {
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