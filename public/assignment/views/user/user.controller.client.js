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
                        $rootScope.currentUser = user;
                        $location.url("/user/"+user._id);
                    });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;
        function createUser(user) {
            if (user.password != user.verifypassword) {
                vm.alert = "incorrect verify password";
                return;
            }
            var promise = UserService.createUser(user);
            promise.then(
                function (response) {
                    vm.user._id = response.data._id;
                    $location.url("/user/" + vm.user._id);
                },
                function (httpError) {
                    throw httpError.status + " : " + httpError.data;
                });
        }
        vm.register = register;
        function register(user) {
            var promise = UserService.register(user);
            promise.then(
                    function(response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/user/"+user._id);
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
                throw httpError.status + " : " + httpError.data;
            });
        vm.updateUser = updateUser;
        function updateUser(updateUser) {
            var promise = UserService.updateUser(userId, updateUser);
            promise.then(
                function (response) {
                    $location.url("/user/" + userId);
                },
                function (httpError) {
                    throw httpError.status + " : " + httpError.data;
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
    }
})();