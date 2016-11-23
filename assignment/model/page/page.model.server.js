/**
 * Created by CherylRuo on 11/9/16.
 */
var q = require("q");

module.exports = function(db, mongoose) {
    var PageModel  = mongoose.model('PageModel');
    var WebsiteModel = mongoose.model('WebsiteModel');

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    return api;

    function createPage(websiteId, page) {
        var deferred = q.defer();
        console.log("Create a page.");
        page._website = websiteId;

        PageModel.create(page, function(err, page) {
            WebsiteModel.findById(websiteId, function (err, website) {
                website.pages.push(page._id);
                website.save(function () {
                    deferred.resolve(page);
                });
            });
        });

        return deferred.promise;
    }

    function findAllPagesForWebsite(websiteId) {
        var deferred = q.defer();

        PageModel.find({_website: websiteId}, function(err, page){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(page);
            }
        });

        return deferred.promise;
    }

    function findPageById(pageId) {
        var deferred = q.defer();

        PageModel.findById(pageId, function(err, page){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(page);
            }
        });

        return deferred.promise;
    }

    function updatePage(pageId, page) {
        var deferred = q.defer();

        // page.delete("_id");

        PageModel.update({_id: pageId}, {$set: page}, function(err, page) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(page);
            }
        });

        return deferred.promise;
    }

    function deletePage(pageId) {
        var deferred = q.defer();
        PageModel.findById(pageId, function(err, page){
            if(err) {
                deferred.reject(err);
            } else {
                var websiteId = page._website;
                PageModel.remove({_id: pageId}, function(err, status) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(status);
                        WebsiteModel.findById(websiteId, function (err, website) {
                            var pages = website.pages;
                            for(var i=pages.length-1; i>0; i--) {
                                if(pages[i] == pageId)
                                    pages.splice(i, 1);
                            }
                            website.save(function () {});
                        });
                    }
                });
            }
        });

        return deferred.promise;
    }
};

