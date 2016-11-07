/**
 * Created by CherylRuo on 10/22/16.
 */
module.exports = function (app) {
    var websites = [
        {_id: 1, name: "Facebook", developerId: 456, description: "facebook"},
        {_id: 2, name: "Tweeter", developerId: 456, description: "tweeter"},
        {_id: 3, name: "Gizmodo", developerId: 456, description: "gizmodo"},
        {_id: 4, name: "Tic Tac Toe", developerId: 123, description: "tic tac toe"},
        {_id: 5, name: "Checkers", developerId: 123, description: "checkers"},
        {_id: 6, name: "Diary", developerId: 234, description: "diary"},
        {_id: 7, name: "Collection", developerId: 234, description: "poker"},
        {_id: 8, name: "Schedule", developerId: 234, description: "black jack"}

    ];

    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        websites.sort();
        website._id = websites[websites.length - 1]._id + 1;
        website.developerId = req.params['userId'];
        websites.push(website);
        res.json(website);
    }

    function findAllWebsitesForUser(req, res) {
        var id = req.params['userId'];
        var result = [];
        for (var w in websites) {
            var website1 = websites[w];
            if (website1.developerId == id) {
                result.push(website1);
            }
        }
        res.send(result);
    }

    function findWebsiteById(req, res) {
        var id = req.params['websiteId'];
        for (var i = 0; i < websites.length; i++) {
            if (websites[i]._id == id)
                res.send(websites[i]);
        }
    }

    function updateWebsite(req, res) {
        var id = req.params['websiteId'];
        var website = req.body;
        for (var w in websites) {
            var website1 = websites[w];
            if (website1._id == id) {
                website1.name = website.name;
                website1.developerId = website.developerId;
                website1.description = website.description;
            }
        }
        res.json(websites);
    }

    function deleteWebsite(req, res) {
        var id = req.params['websiteId'];
        for(var i=websites.length-1; i>=0; i--) {
            if(websites[i]._id == id)
                websites.splice(i, 1);
        }
        res.send(websites);
    }
};
