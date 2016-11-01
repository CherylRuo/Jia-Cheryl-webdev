/**
 * Created by CherylRuo on 10/22/16.
 */
module.exports = function (app) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    var express = require('express');

    var widgets = [
        {_id: 123, widgetType: "HEADER", pageId: 246, size: 2, text: "GIZMODO"},
        {_id: 234, widgetType: "HEADER", pageId: 321, size: 4, text: "Lorem ipsum"},
        {
            _id: 345, widgetType: "IMAGE", pageId: 246, text: "image", width: "100%",
            url: "https://pbs.twimg.com/profile_images/749999977145987073/TIBx9FL__400x400.jpg"
        },
        {_id: 456, widgetType: "HTML", pageId: 246, text: "<p>Lorem ipsum</p>"},
        {_id: 567, widgetType: "HEADER", pageId: 321, size: 4, text: "Lorem ipsum"},
        {
            _id: 678, widgetType: "YOUTUBE", pageId: 246, text: "youtube", width: "100%",
            url: "https://youtu.be/AM2Ivdi9c4E"
        },
        {_id: 135, widgetType: "HTML", pageId: 222, text: "<p>Lorem ipsum</p>"},
        {_id: 234, widgetType: "HTML", pageId: 259, text: "<p>Lorem ipsum</p>"}
    ];

    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);



    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for(var w in widgets) {
            var widget = widgets[w];
            if(widget._id == widgetId) {
                widget.url = "/uploads/" + filename;
                widget.width = width;
            }
        }
    }

    function selectPhoto(photo) {
        var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
        url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
        WidgetService
            .updateWidget(websiteId, pageId, widgetId, {url: url})
            // .then(...);
    }

    function createWidget(req, res) {
        var widget = req.body;
        widgets.sort();
        widget._id = widgets[widgets.length - 1]._id + 1;
        widget.pageId = req.params['pageId'];
        widgets.push(widget);
        res.json(widget);
    }

    function findAllWidgetsForPage(req, res) {
        var id = req.params['pageId'];
        var result = [];
        for (var w in widgets) {
            var widget1 = widgets[w];
            if (widget1.pageId == id) {
                result.push(widget1);
            }
        }
        res.send(result);
    }

    function findWidgetById(req, res) {
        var id = req.params['widgetId'];
        for (var i = 0; i < widgets.length; i++) {
            if (widgets[i]._id == id)
                res.send(widgets[i]);
        }
    }

    function updateWidget(req, res) {
        var id = req.params['widgetId'];
        var widget = req.body;
        for (var w in widgets) {
            var widget1 = widgets[w];
            if (widget1._id == id) {
                widget1.name = widget.name;
                widget1.developerId = widget.developerId;
                widget1.description = widget.description;
            }
        }
        res.json(widgets);
    }

    function deleteWidget(req, res) {
        var id = req.params['widgetId'];
        for(var i=0; i<widgets.length; i++) {
            if(widgets[i]._id == id)
                widgets.splice(i, 1);
        }
        res.send(widgets);
    }
};