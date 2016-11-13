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
        var myFile        = req.file;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var widgetId      = req.body.widgetId;
        if(myFile == null) {
            res.redirect('../assignment/index.html#/user/'+userId+'/website/'+websiteId+'/page/'+pageId+'/widget/'+widgetId);
            return;
        }
        var width         = req.body.width;
        var filename      = myFile.filename;     // new file name in upload folder


        for(var w in widgets) {
            var widget = widgets[w];
            if(widget._id == widgetId) {
                widget.url = "/uploads/" + filename;
                widget.width = width;
            }
        }
        res.redirect('../assignment/index.html#/user/'+userId+'/website/'+websiteId+'/page/'+pageId+'/widget/'+widgetId);
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
            .updateWidget(req.params.widgetId)
            .then(function(widget) {
                res.json(widget);
            });
    }

    function reorderWidget(req, res) {
        var start = req.query.start;
        var end = req.query.end;
        var pageId = req.params.pageId;
        var curWidgets = [];
        for(var i=widgets.length-1; i>=0; i--) {
            if (widgets[i].pageId == pageId) {
                curWidgets.splice(0, 0, widgets[i]);
                widgets.splice(i, 1);
            }
        }
        var element = curWidgets.splice(start, 1)[0];
        curWidgets.splice(end, 0, element);
        widgets = widgets.concat(curWidgets);
        res.send(widgets);
    }

    function deleteWidget(req, res) {
        model
            .deleteWidget(req.params.widgetId)
            .then(function(status){
                res.json(status);
            });
    }
};