/**
 * Created by CherylRuo on 11/4/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);
    function FlickrService($http) {
        var key = "a6cc364d73ee8006d8c070f098332c5b";
        var secret = "5961bde6964ad48e";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent"+
            "&format=json&api_key=API_KEY&text=TEXT";

        var api = {
            searchPhotos   : searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();