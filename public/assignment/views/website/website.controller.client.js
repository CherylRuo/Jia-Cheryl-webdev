/**
 * Created by CherylRuo on 10/7/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        WebsiteService.findAllWebsitesForUser(userId, function(response) {
            vm.websites = response;
        });
        vm.userId = userId;
    }

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        WebsiteService.findAllWebsitesForUser(userId, function(response) {
            vm.websites = response;
        });
        vm.createWebsite = createWebsite;
        function createWebsite(website) {
            if(website == null) {
                vm.alert = "Please create a website.";
                return;
            }
            WebsiteService.createWebsite(vm.userId, website, function(response) {
                vm.website = response;
                $location.url("/user/"+ userId +"/website");
            });
        }
        vm.userId = userId;
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        var websiteId = parseInt($routeParams.wid);
        WebsiteService.findWebsiteById(websiteId, function(response) {
            vm.website = response;
        });
        WebsiteService.findAllWebsitesForUser(userId, function(response) {
            vm.websites = response;
        });
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        function updateWebsite(updateWebsite) {
            WebsiteService.updateWebsite(websiteId, updateWebsite, function(response) {
                $location.url("/user/" + userId + "/website");
            });
        }
        function deleteWebsite() {
            WebsiteService.deleteWebsite(websiteId, function(response) {
                $location.url("/user/" + userId + "/website");
            });
        }
        vm.userId = userId;
        vm.websiteId = websiteId;
    }
})();