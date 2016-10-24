/**
 * Created by CherylRuo on 10/7/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    function UserService() {
        var users = [
            {_id: 123, username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: 234, username: "cheryl",      password: "cheryl",      firstName: "Cheryl",    lastName: "Jia"  },
            {_id: 345, username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: 456, username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        var api = {
            createUser   : createUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser
        };
        return api;

        function createUser(user) {
            var id = Math.floor(Math.random()*900)+100;
            while(findUserById(id) != null) {
                id = Math.floor(Math.random()*900)+100;
            }
            user._id = id;
            users.push(user);
            return user._id;
        }

        function findUserById(id) {
            for(var i=0; i<users.length; i++) {
                if(users[i]._id === id)
                    return users[i];
            }
            return null;
        }

        function findUserByUsername(username) {
            for(var i=0; i<users.length; i++) {
                if(users[i].username === username)
                    return users[i];
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                user = users[u];
                if(user.username===username && user.password===password)
                    return user;
            }
            return null;
        }

        function updateUser(userId, user) {
            for(var i=0; i<users.length; i++) {
                if(users[i]._id === userId)
                    users[i] = user;
            }
            return null;
        }

        function deleteUser(userId) {
            for(var i=0; i<users.length; i++) {
                if (users[i]._id === userId)
                    users.splice(i, 1);
            }
        }
    }
})();