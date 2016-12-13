/**
 * Created by CherylRuo on 10/7/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, $rootScope, UserService) {
        var vm = this;
        vm.login = login;
        function login(user) {
            UserService
                .login(user)
                .then(
                    function(response) {
                        var user = response.data;
                        if (user && user._id) {
                            $rootScope.currentUser = user;
                            $location.url("/user/" + user._id);
                        } else {
                            vm.error = "Username or password is incorrect.";
                        }
                    },
                    function (error) {
                        vm.error = "Cannot login.";
                    });
        }
    }

    function RegisterController($location, UserService, $rootScope) {
        var vm = this;
        vm.register = register;
        function register(user) {
            var promise = UserService.register(user);
            promise.then(
                    function(response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/user/"+user._id);
                    },
                    function (httpError) {
                        vm.error = "User already exists!";
                    });
        }
    }

    function ProfileController($location, $routeParams, $rootScope, UserService) {
        var vm = this;
        vm.userId = $rootScope.currentUser._id;
        var userId = vm.userId;
        var promise = UserService.findUserById(userId);

        promise.then(
            function (response) {
                vm.user = response.data;
            },
            function (httpError) {
                vm.error = "Error!";
            });
        vm.updateUser = updateUser;
        function updateUser(updateUser) {
            var promise = UserService.updateUser(userId, updateUser);
            promise.then(
                function (response) {
                    $location.url("/user/" + userId);
                },
                function (httpError) {
                    vm.error = "Error!";
                });
        }

        vm.logout = logout;
        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    });
        }
        vm.unregister = unregister;
        function unregister() {
            UserService
                .unregisterUser(vm.userId)
                .then(
                    function (response) {
                        // Take the user to login page on successful deletion
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function (httpError) {
                        // Display failure message
                        vm.deleteError = "Error! ";
                    }
                );
        }
    }
})();