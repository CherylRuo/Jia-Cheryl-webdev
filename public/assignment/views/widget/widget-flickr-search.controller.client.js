/**
 * Created by CherylRuo on 10/25/16.
 */
vm.searchPhotos = function(searchTerm) {
    FlickrService
        .searchPhotos(searchTerm)
        .then(function(response) {
            data = response.data.replace("jsonFlickrApi(","");
            data = data.substring(0,data.length - 1);
            data = JSON.parse(data);
            vm.photos = data.photos;
        });

    // ...
    // var key = "your-flickr-key";
    // var secret = "your-flickr-secret";
    // var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search
    // &format=json&api_key=API_KEY&text=TEXT";
    //     ...
    //     function searchPhotos(searchTerm) {
    //     var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
    //     return $http.get(url);
    // }
}