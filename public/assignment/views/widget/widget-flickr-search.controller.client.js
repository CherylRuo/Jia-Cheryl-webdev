/**
 * Created by CherylRuo on 10/25/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, FlickrService, WidgetService) {
        var vm = this;
        var websiteId = parseInt($routeParams.wid);
        var userId = parseInt($routeParams.uid);
        var pageId = parseInt($routeParams.pid);
        var widgetId = parseInt($routeParams.wgid);
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.pageId = pageId;
        vm.widgetId = widgetId;

        vm.searchPhotos = function (searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function (response) {
                    var data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        };

        vm.selectPhoto = selectPhoto;
        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            WidgetService
                .updateImage(widgetId, {url: url})
                .then(function (response) {

                });
        }
    }
})();