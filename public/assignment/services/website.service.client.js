/**
 * Created by CherylRuo on 10/7/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    function WebsiteService() {
        var websites = [
            { _id: 123, name: "Facebook",    developerId: 456, description: "facebook" },
            { _id: 234, name: "Tweeter",     developerId: 456, description: "tweeter" },
            { _id: 456, name: "Gizmodo",     developerId: 456, description: "gizmodo" },
            { _id: 567, name: "Tic Tac Toe", developerId: 123, description: "tic tac toe" },
            { _id: 678, name: "Checkers",    developerId: 123, description: "checkers" },
            { _id: 789, name: "Chess",       developerId: 234, description: "chess" }
        ];
        var api = {
            createWebsite  : createWebsite,
            findWebsitesByUser : findWebsitesByUser,
            findWebsiteById : findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite
        };
        return api;
        function createWebsite(userId, website) {
            var id = Math.floor(Math.random()*900)+100;
            while(findWebsiteById(id) != null) {
                id = Math.floor(Math.random()*900)+100;
            }
            website._id = id;
            website.developerId = userId;
            websites.push(website);
            return website._id;
        }

        function findWebsitesByUser(userId) {
            var result = [];
            for(var i=0; i<websites.length; i++) {
                if(websites[i].developerId === userId) {
                    result.push(websites[i]);
                }
            }
            return result;
        }

        function findWebsiteById(websiteId) {
            for(var i=0; i<websites.length; i++) {
                if(websites[i]._id === websiteId) {
                    return websites[i];
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            for(var i=0; i<websites.length; i++) {
                if(websites[i]._id === websiteId) {
                    websites[i] = website;
                }
            }
        }

        function deleteWebsite(websiteId) {
            for(var i = websites.length-1; i--;){
                if (websites[i]._id === websiteId)
                    websites[i].splice(i, 1);
            }
        }
    }
})();