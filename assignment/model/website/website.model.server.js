/**
 * Created by CherylRuo on 11/9/16.
 */
var q = require("q");

module.exports = function(db, mongoose) {
    var UserModel = mongoose.model('UserModel');
    var WebsiteModel  = mongoose.model('WebsiteModel');
    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;

    function createWebsiteForUser(userId, website) {
        var deferred = q.defer();
        console.log("Create a website.");
        website._user = userId;
        WebsiteModel.create(website, function(err, website) {
            UserModel.findById(userId, function (err, user) {
                user.websites.push(website);
                user.save(function (err, user) {
                    deferred.resolve(user);
                });
            });
        });

        return deferred.promise;
    }

    function findAllWebsitesForUser(userId) {
        var deferred = q.defer();

        WebsiteModel.find({_user: userId}, function(err, website){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(website);
            }
        });

        return deferred.promise;
    }

    function findWebsiteById(websiteId) {
        var deferred = q.defer();

        WebsiteModel.findById(websiteId, function(err, website){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(website);
            }
        });

        return deferred.promise;
    }

    function updateWebsite(websiteId, website) {
        var deferred = q.defer();

        // website.delete("_id");

        WebsiteModel.update({_id: websiteId}, {$set: website}, function(err, website) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(website);
            }
        });

        return deferred.promise;
    }

    function deleteWebsite(websiteId) {
        var deferred = q.defer();

        WebsiteModel.remove({_id: websiteId}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }
};

