/**
 * Created by CherylRuo on 10/22/16.
 */
module.exports = function (app, model) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    var express = require('express');

    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.put('/api/page/:pageId/widget', reorderWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);

    function uploadImage(req, res) {
        var myFile = req.file;
        var widget = req.body;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var widgetId = req.body.widgetId;
        if(myFile == null) {
            res.redirect('../assignment/home.html#/user/'+userId+'/website/'+websiteId+'/page/'+pageId+'/widget/'+widgetId);
            return;
        }
        var width         = req.body.width;
        var filename      = myFile.filename;     // new file name in upload folder

        widget.url = "/uploads/" + filename;
        widget.width = width;

        model
            .updateWidget(widgetId, widget)
            .then(function(widget) {
                res.json(widget);
            });

        res.redirect('../assignment/home.html#/user/'+userId+'/website/'+websiteId+'/page/'+pageId+'/widget/'+widgetId);
    }

    function createWidget(req, res) {
        model
            .createWidget(req.params.pageId, req.body)
            .then(function(widget) {
                res.json(widget);
            });
    }

    function findAllWidgetsForPage(req, res) {
        model
            .findAllWidgetsForPage(req.params.pageId)
            .then(function(page) {
                res.json(page);
            });
    }

    function findWidgetById(req, res) {
        model
            .findWidgetById(req.params.widgetId)
            .then(function(widget) {
                res.json(widget);
            });
    }

    function updateWidget(req, res) {
        model
            .updateWidget(req.params.widgetId, req.body)
            .then(function(widget) {
                res.json(widget);
            });
    }

    function reorderWidget(req, res) {
        var start = req.query.start;
        var end = req.query.end;
        model
            .reorderWidget(req.params.pageId, start, end)
            .then(function(widgets) {
                res.json(widgets);
            });
    }

    function deleteWidget(req, res) {
        model
            .deleteWidget(req.params.widgetId)
            .then(function(status){
                res.json(status);
            });
    }
};