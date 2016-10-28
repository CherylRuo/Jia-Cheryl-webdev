/**
 * Created by CherylRuo on 10/7/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    function WebsiteService($http) {
        var api = {
            createWebsite  : createWebsite,
            findAllWebsitesForUser : findAllWebsitesForUser,
            findWebsiteById : findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite
        };
        return api;

        function createWebsite(userId, website, callback) {
            $http
                .post("/api/user/" + userId + "/website", website)
                .success(callback);
        }

        function findAllWebsitesForUser(userId, callback) {
            $http
                .get("/api/user/" + userId + "/website")
                .success(callback);
        }

        function findWebsiteById(websiteId, callback) {
            $http
                .get("/api/website/" + websiteId)
                .success(callback);
        }

        function updateWebsite(websiteId, website, callback) {
            $http
                .put("/api/website/" + websiteId, website)
                .success(callback);
        }

        function deleteWebsite(websiteId, callback) {
            $http
                .delete("/api/website/" + websiteId)
                .success(callback);
        }
    }
})();