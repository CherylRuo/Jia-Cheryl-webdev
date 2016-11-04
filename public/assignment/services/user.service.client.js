/**
 * Created by CherylRuo on 10/7/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    function UserService($http) {
        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            unregisterUser: unregisterUser
        };
        return api;

        function createUser(user) {
            return $http
                .post("/api/user/", user)
        }

        function findUserById(id) {
            return $http
                .get("/api/user/" + id)
        }

        function findUserByUsername(username) {
            return $http
                .get("/api/user?username=" + username)
        }

        function findUserByCredentials(username, password) {
            return $http
                .get("/api/user?username=" + username + "&password=" + password)

        }

        function updateUser(userId, user) {
            return $http
                .put("/api/user/" + userId, user)
        }

        function unregisterUser(userId) {
            return $http
                .delete("/api/user/" + userId)
        }
    }
})();