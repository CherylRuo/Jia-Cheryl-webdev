/**
 * Created by CherylRuo on 10/7/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)
    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        function login(user) {
            user = UserService.findUserByCredentials(user.username, user.password);
            if(user) {
                $location.url("/user/" + user._id);
            } else {
                vm.alert = "Unable to login";
            }
        }
    }

    function RegisterController($routeParams, UserService) {
        var vm = this;
        vm.user = $routeParams["user"];
        vm.createWebsite = createWebsite;
        function createWebsite(user) {
            UserService.createWebsite(user);
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["userId"];
        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();
    }
})();