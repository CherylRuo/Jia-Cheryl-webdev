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

        function login(username, password) {
            var user = UserService.findUserByCredentials(username, password);
            if(user === null) {
                vm.error = "No such user";
            } else {
                $location.url("/user/" + user._id);
            }
        }
    }

    function RegisterController($routeParams, $location, UserService) {
        var vm = this;
        var password = $routeParams['password'];
        var verify_password = $routeParams['verifypassword']
        if(password != verify_password) {
            vm.error = "incorrect verify password";
        }
        vm.createUser = createUser;
        function createUser(user) {
            var id = UserService.createUser(user);
            $location.url("/user/" + id);
        }
    }

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        var user = UserService.findUserById(userId);
        if(user != null) {
            vm.user = user;
        }
        vm.updateUser = updateUser;
        function updateUser(updateUser) {
            UserService.updateUser(userId, updateUser);
            $location.url("/user/" + userId);
        }
    }
})();