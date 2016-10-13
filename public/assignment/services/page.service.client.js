/**
 * Created by CherylRuo on 10/7/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];
        var api = {
            "createPage"   : "createPage",
            "findPageByWebsiteId" : "findPageByWebsiteId",
            "findPageById" : "findPageById",
            "updatePage" : "updatePage",
            "deletePage" : "deletePage"
        };
        return api;
        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            pages.add(websiteId);
        }

        function findPageByWebsiteId(websiteId) {
            for(var i=0; i<pages.length; i++) {
                pages[i].websiteId === websiteId;
                return pages[i];
            }
            return null;
        }

        function findPageById(pageId) {
            for(var i=0; i<pages.length; i++) {
                pages[i].pageId === pageId;
                return pages[i];
            }
            return null;
        }

        function updatePage(pageId, page) {
            for(var i=0; i<pages.length; i++) {
                pages[i].pageId === pageId;
                pages[i] = page;
            }
        }

        function deletePage(pageId) {
            for(var i=pages.length-1; i--;){
                if (pages[i].pageId === pageId)
                    pages[i].splice(i, 1);
            }
        }
    }
})();