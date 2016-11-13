/**
 * Created by CherylRuo on 10/22/16.
 */
module.exports = function (app, model) {

    app.post('/api/user/:userId/website', createWebsiteForUser);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    function createWebsiteForUser(req, res) {
        model
            .createWebsiteForUser(req.params.userId, req.body)
            .then(function(website) {
                res.json(website);
            });
    }

    function findAllWebsitesForUser(req, res) {
        model
            .findAllWebsitesForUser(req.params.userId)
            .then(function(website) {
                res.json(website);
            });
    }

    function findWebsiteById(req, res) {
        model
            .findWebsiteById(req.params.websiteId)
            .then(function(website) {
                res.json(website);
            });
    }

    function updateWebsite(req, res) {
        model
            .updateWebsite(req.params.websiteId, req.body)
            .then(function(website) {
                res.json(website);
            });
    }

    function deleteWebsite(req, res) {
        model
            .deleteWebsite(req.params.websiteId)
            .then(function(status){
                res.json(status);
            });
    }
};
