/**
 * Created by CherylRuo on 10/7/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            var promise = UserService.findUserByCredentials(username, password);
            promise.then(
                    function(response) {
                    vm.user = response.data;
                    if (vm.user == null) {
                        vm.alert = "No such user";
                    } else {
                        $location.url("/user/" + vm.user._id);
                    }
                },
                function (httpError) {
                    throw httpError.status + " : " + httpError.data;
                });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;
        function createUser(user) {
            if(user.password != user.verifypassword) {
                vm.alert = "incorrect verify password";
                return;
            }
            var promise = UserService.createUser(user);
            promise.then(
                function(response) {
                    vm.user._id = response.data._id;
                    $location.url("/user/" + vm.user._id);
                },
                function (httpError) {
                    throw httpError.status + " : " + httpError.data;
                });
        }
    }

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        var promise = UserService.findUserById(userId);
        promise.then(
            function(response)
            {
                vm.user = response.data;
            },
            function (httpError) {
                throw httpError.status + " : " + httpError.data;
            });
        vm.updateUser = updateUser;
        function updateUser(updateUser) {
            var promise = UserService.updateUser(userId, updateUser);
            promise.then(
                function(response) {
                    $location.url("/user/" + userId);
                },
                function (httpError) {
                    throw httpError.status + " : " + httpError.data;
                });
        }
    }
})();