/**
 * Created by CherylRuo on 10/22/16.
 */
module.exports = function (app) {
    var websites = [
        {_id: 123, name: "Facebook", developerId: 456, description: "facebook"},
        {_id: 234, name: "Tweeter", developerId: 456, description: "tweeter"},
        {_id: 456, name: "Gizmodo", developerId: 456, description: "gizmodo"},
        {_id: 567, name: "Tic Tac Toe", developerId: 123, description: "tic tac toe"},
        {_id: 678, name: "Checkers", developerId: 123, description: "checkers"},
        {_id: 789, name: "Chess", developerId: 234, description: "chess"}
    ];

    app.post("/api/user/:userId/website", function (req, res) { //createWebsite
        var website = req.body;
        websites.sort();
        website._id = websites[websites.length - 1]._id + 1;
        website.developerId = req.params['userId'];
        websites.push(website);
        res.json(website);
    });

    app.get("/api/user/:userId/website", function (req, res) { //findAllWebsitesForUser
        var id = req.params['userId'];
        var result = [];
        for (var w in websites) {
            var website1 = websites[w];
            if (website1.developerId == id) {
                result.push(website1);
            }
        }
        res.send(result);
    });

    app.get("/api/website/:websiteId", function (req, res) { //findWebsiteById
        var id = req.params['websiteId'];
        for (var i = 0; i < websites.length; i++) {
            if (websites[i]._id == id)
                res.send(websites[i]);
        }
    });

    app.put("/api/website/:websiteId", function (req, res) { //updateWebsite
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
    });

    app.delete("/api/website/:websiteId", function (req, res) { //deleteWebsite
        var id = req.params['websiteId'];
        for(var i=0; i<websites.length; i++) {
            if(websites[i]._id == id)
                websites.splice(i, 1);
        }
        res.send(websites);
    });
}
