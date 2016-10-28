/**
 * Created by CherylRuo on 10/7/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, $http, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            UserService.findUserByCredentials(username, password, function(response) {
                vm.user = response;
                if(vm.user == null) {
                    vm.alert = "No such user";
                } else {
                    $location.url("/user/" + vm.user._id);
                }
            });
        }
    }

    function RegisterController($location, $http, UserService) {
        var vm = this;
        vm.createUser = createUser;
        function createUser(user) {
            if(user.password != user.verifypassword) {
                vm.alert = "incorrect verify password";
                return;
            }
            UserService.createUser(user, function(response) {
                vm.user._id = response._id;
                $location.url("/user/" + vm.user._id);
            });
        }
    }

    function ProfileController($location, $routeParams, $http, UserService) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        UserService.findUserById(userId, function(response) {
            vm.user = response;
        });
        vm.updateUser = updateUser;
        function updateUser(updateUser) {
            UserService.updateUser(userId, updateUser, function(response) {});
            $location.url("/user/" + userId);
        }
    }
})();