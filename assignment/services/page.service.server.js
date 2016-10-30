/**
 * Created by CherylRuo on 10/22/16.
 */
module.exports = function (app) {
    var pages = [
        {_id: 321, name: "Post 1", websiteId: 456},
        {_id: 432, name: "Post 2", websiteId: 456},
        {_id: 543, name: "Post 3", websiteId: 456},
        {_id: 246, name: "Post 4", websiteId: 789}
    ];

    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function createPage(req, res) {
        var page = req.body;
        pages.sort();
        page._id = pages[pages.length - 1]._id + 1;
        page.websiteId = req.params['websiteId'];
        pages.push(page);
        res.json(page);
    }

    function findAllPagesForWebsite(req, res) {
        var id = req.params["websiteId"];
        var result = [];
        for (var p in pages) {
            var page1 = pages[p];
            if (page1.websiteId == id) {
                result.push(page1);
            }
        }
        res.send(result);
    }

    function findPageById(req, res) {
        var id = req.params["pageId"];
        for (var i = 0; i < pages.length; i++) {
            if (pages[i]._id == id)
                res.send(pages[i]);
        }
    }

    function updatePage(req, res) {
        var id = req.params["pageId"];
        var page = req.body;
        for (var w in pages) {
            var page1 = pages[w];
            if (page1._id == id) {
                page1.name = page.name;
                page1.developerId = page.developerId;
                page1.description = page.description;
            }
        }
        res.json(pages);
    }

    function deletePage(req, res) {
        var id = req.params["pageId"];
        for(var i=0; i<pages.length; i++) {
            if(pages[i]._id == id)
                pages.splice(i, 1);
        }
        res.send(pages);
    }
};