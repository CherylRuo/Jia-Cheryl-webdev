/**
 * Created by CherylRuo on 10/22/16.
 */
module.exports = function (app) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    var express = require('express');

    var widgets = [
        {_id: 1, widgetType: "HEADER", pageId: 1, size: 2, text: "Cruise"},
        {
            _id: 3, widgetType: "IMAGE", pageId: 1, text: "image", width: "100%",
            url: "http://images.r.cruisecritic.com/features/2016/03/10-lux-cruise-main.jpg"
        },
        {_id: 4, widgetType: "HTML", pageId: 1, text: "<p>Cruise log</p>"},
        {
            _id: 6, widgetType: "YOUTUBE", pageId: 1, text: "youtube", width: "100%",
            url: "https://youtu.be/AM2Ivdi9c4E"
        },
        {_id: 9, widgetType: "HEADER", pageId: 4, size: 4, text: "Chanel"},
        {
            _id: 10, widgetType: "IMAGE", pageId: 4, text: "image", width: "100%",
            url: "https://trr-sales-images-production.s3.amazonaws.com/uploads/" +
            "landing_page/image/62/Chanel-Top-Level-SEO-Landing.jpg"
        },
        {_id: 11, widgetType: "HEADER", pageId: 6, size: 4, text: "Yesenia"},
        {
            _id: 12, widgetType: "YOUTUBE", pageId: 6, text: "youtube", width: "100%",
            url: "https://www.youtube.com/watch?v=HX_d3-a0KT4&list=PLIb3luYqpTIpgGlu4NcMAOj9qlPoyVeDT"
        },
        {_id: 13, widgetType: "HEADER", pageId: 5, size: 4, text: "How to create a MEAN stack web application?"},
        {_id: 14, widgetType: "HTML", pageId: 5, text: "<p>https://www.codeschool.com/mean</p>"},
        {_id: 15, widgetType: "HEADER", pageId: 2, size: 4, text: "Matcha Ice Cream"},
        {
            _id: 16, widgetType: "IMAGE", pageId: 2, text: "image", width: "100%",
            url: "http://www.supernummy.com/wp-content/uploads/2015/05/Green-Tea-Ice-Cream-1-of-1.jpg?x31672"
        },
        {_id: 17, widgetType: "HEADER", pageId: 3, size: 4, text: "Favorite Halloween Costume!!!"},
        {
            _id: 18, widgetType: "IMAGE", pageId: 3, text: "image", width: "100%",
            url: "https://spirit.scene7.com/is/image/Spirit/01327139-d?$Thumbnail$"
        },
        {_id: 19, widgetType: "HTML", pageId: 7, text: "<p>Time: October 28, 2016. Wednesday. 2PM." +
        "<br>Company Name: XXX</p>"}
    ];

    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.put('/api/page/:pageId/widget', updateWidgetOrder);
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
                widget1.developerId = widget.developerId;
                widget1.text = widget.text;
                widget1.url = widget.url;
                widget1.size = widget.size;
                widget1.width = widget.width;
            }
        }
        res.json(widgets);
    }

    function updateWidgetOrder(req, res) {
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
        var id = req.params['widgetId'];
        for(var i=0; i<widgets.length; i++) {
            if(widgets[i]._id == id)
                widgets.splice(i, 1);
        }
        res.send(widgets);
    }
};