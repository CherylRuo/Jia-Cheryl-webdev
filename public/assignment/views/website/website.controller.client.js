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
        var userId = parseInt($routeParams.uid);
        vm.websites = WebsiteService.findWebsitesByUser(userId);
        vm.userId = userId;
    }

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        var websites = WebsiteService.findWebsitesByUser(userId);
        if(websites != null) {
            vm.websites = websites;
        }
        vm.createWebsite = createWebsite;
        function createWebsite(website) {
            if(website == null) {
                vm.error = "Please create a website.";
                return;
            }
            WebsiteService.createWebsite(vm.userId, website);
            $location.url("/user/"+ userId +"/website");
        }
        vm.userId = userId;
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        var websiteId = parseInt($routeParams.wid);
        var website = WebsiteService.findWebsiteById(websiteId);
        vm.website = website;
        var websites = WebsiteService.findWebsitesByUser(userId);
        if(websites != null) {
            vm.websites = websites;
        }
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        function updateWebsite(updateWebsite) {
            WebsiteService.updateWebsite(websiteId, updateWebsite);
            $location.url("/user/" + userId + "/website");
        }
        function deleteWebsite() {
            WebsiteService.deleteWebsite(websiteId);
            $location.url("/user/" + userId + "/website");
        }
        vm.userId = userId;
        vm.websiteId = websiteId;
    }
})();