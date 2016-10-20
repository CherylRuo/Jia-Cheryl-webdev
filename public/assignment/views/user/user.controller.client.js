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

    function RegisterController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;
        function createUser(user) {
            if(user.password != user.verifypassword) {
                vm.error = "incorrect verify password";
                return;
            }
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