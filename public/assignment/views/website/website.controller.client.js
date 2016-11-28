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
        var promise = WebsiteService.findAllWebsitesForUser(userId);
        promise.then(
            function(response){
                vm.websites = response.data;
            },
            function (httpError) {
                vm.error = "Cannot find website for this user."
            });
        vm.userId = userId;
    }

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        var promise = WebsiteService.findAllWebsitesForUser(userId);
        promise.then(
            function(response) {
                vm.websites = response.data;
            },
            function (httpError) {
                vm.error = "Cannot find website for this user."
            });
        vm.createWebsite = createWebsite;
        function createWebsite(website) {
            if(website == null) {
                vm.alert = "Please create a website.";
                return;
            }
            var promise = WebsiteService.createWebsite(vm.userId, website);
            promise.then(
                function(response){
                    vm.website = response.data;
                    $location.url("/user/"+ userId +"/website");
                },
                function (httpError) {
                    vm.error = "Cannot create website."
                });
        }
        vm.userId = userId;
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        var websiteId = parseInt($routeParams.wid);

        var promise = WebsiteService.findWebsiteById(websiteId);
        promise.then(
            function(response){
                vm.website = response.data;
            },
            function (httpError) {
                vm.error = "Cannot find website."
            });
        var promise1 = WebsiteService.findAllWebsitesForUser(userId);
        promise1.then(
            function(response){
                vm.websites = response.data;
            },
            function (httpError) {
                vm.error = "Cannot find website for this user."
            });
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        function updateWebsite(updateWebsite) {
            var promise = WebsiteService.updateWebsite(websiteId, updateWebsite);
            promise.then(
                function(response){
                    $location.url("/user/" + userId + "/website");
                },
                function (httpError) {
                    vm.error = "Cannot update website."
                });
        }
        function deleteWebsite() {
            var promise = WebsiteService.deleteWebsite(websiteId);
            promise.then(
                function(response){
                    $location.url("/user/" + userId + "/website");
                },
                function (httpError) {
                    vm.error = "Cannot delete website."
                });
        }
        vm.userId = userId;
        vm.websiteId = websiteId;
    }
})();