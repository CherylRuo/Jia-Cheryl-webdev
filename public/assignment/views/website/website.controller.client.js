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

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        var website = WebsiteService.findWebsitesByUser(userId);
        if(website != null) {
            vm.website = website;
        }
        vm.createWebsite = createWebsite;
        function createWebsite(website) {
            WebsiteService.createWebsite(vm.userId, website);
            $location.url("/user/"+ userId +"/website");
        }
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        var websiteId = parseInt($routeParams.wid);
        var website = WebsiteService.findWebsiteById(websiteId);
        if(website != null) {
            vm.website = website;
        }
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        function updateWebsite(updateWebsite) {
            WebsiteService.updateWebsite(websiteId, updateWebsite);
            $location.url("/user/" + userId + "/website");
        }
        function deleteWebsite() {
            WebsiteService.deleteWebsite(websiteId);
        }
    }
})();