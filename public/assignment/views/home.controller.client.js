/**
 * Created by itops on 5/18/17.
 */
/* Set the width of the side navigation to 250px */
(function() {
    angular
        .module("webapp")
        .controller("HomeController", HomeController);

    function HomeController() {
        var vm = this;
        vm.openNav = openNav;
        // vm.searchQuery = searchQuery;
        vm.navOpened = false;
        function openNav() {
            vm.navOpened = !vm.navOpened;
        }
    }
})();