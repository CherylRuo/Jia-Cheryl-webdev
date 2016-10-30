/**
 * Created by CherylRuo on 10/7/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    function UserService($http) {
        var api = {
            createUser   : createUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            unregisterUser : unregisterUser
        };
        return api;

        function createUser(user, callback) {
            $http
                .post("/api/user/", user)
                .success(callback);
        }

        function findUserById(id, callback) {
            $http
                .get("/api/user/" + id)
                .success(callback);
        }

        function findUserByUsername(username, callback) {
            $http
                .get("/api/user?username=" + username)
                .success(callback);
        }

        function findUserByCredentials(username, password, callback) {
            $http
                .get("/api/user?username="+username + "&password=" + password)
                .success(callback);

        }

        function updateUser(userId, user, callback) {
            $http
                .put("/api/user/" + userId, user)
                .success(callback);
        }

        function unregisterUser(userId, callback) {
            $http
                .delete("/api/user/" + userId)
                .success(callback);
        }
    }
})();