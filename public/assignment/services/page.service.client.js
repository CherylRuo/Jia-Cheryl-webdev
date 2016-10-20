/**
 * Created by CherylRuo on 10/7/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService() {
        var pages = [
            { _id: 321, name: "Post 1", websiteId: 456 },
            { _id: 432, name: "Post 2", websiteId: 456 },
            { _id: 543, name: "Post 3", websiteId: 456 },
            { _id: 246, name: "Post 4", websiteId: 789 }
        ];
        var api = {
            createPage   : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage
        };
        return api;

        function createPage(websiteId, page) {
            var id = Math.floor(Math.random()*900)+100;
            while(findPageById(id) != null) {
                id = Math.floor(Math.random()*900)+100;
            }
            page._id = id;
            page.websiteId = websiteId;
            pages.push(page);
            return page._id;
        }

        function findPageByWebsiteId(websiteId) {
            var result = [];
            for(var i=0; i<pages.length; i++) {
                if(pages[i].websiteId === websiteId) {
                    result.push(pages[i]);
                }
            }
            return result;
        }

        function findPageById(pageId) {
            for(var i=0; i<pages.length; i++) {
                if(pages[i]._id === pageId) {
                    return pages[i];
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for(var i=0; i<pages.length; i++) {
                if(pages[i]._id === pageId) {
                    pages[i] = page;
                }
            }
        }

        function deletePage(pageId) {
            for(var i=0; i<pages.length; i++) {
                if (pages[i]._id === pageId) {
                    pages.splice(i, 1);
                }
            }
        }
    }
})();