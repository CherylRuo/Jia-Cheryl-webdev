/**
 * Created by CherylRuo on 10/22/16.
 */
module.exports = function (app) {
    var users = [
        {_id: 123, username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: 234, username: "cheryl",      password: "cheryl",      firstName: "Cheryl",    lastName: "Jia"  },
        {_id: 345, username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: 456, username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post("/api/user", function(req, res) { //createUser
        var user = req.body;
        console.log(user);
        users.sort();
        user._id = users[users.length-1]._id+1;
        users.push(user);
        res.json(user);
    });

    app.get("/api/user", function(req, res, next) { //findUserByUsername
        var username = req.query.username;
        var password = req.query.password;
        console.log(username);
        console.log(password);
        if(username != undefined && password === undefined) {
            for(var i = 0; i < users.length; i++) {
                if (users[i].username == username) {
                    console.log(users[i]);
                    res.send(users[i]);
                }
            }
        } else if(username != undefined && password != undefined) {
            for(var u in users) {
                user = users[u];
                if(user.username==username && user.password==password) {
                    console.log(user);
                    res.send(user);
                }
            }
        }
    });

    // app.get("/api/user", function(req, res) { //findUserByCredentials
    //     var username = req.query.username;
    //     var password = req.query.password;
    //     for(var u in users) {
    //         user = users[u];
    //         if(user.username==username && user.password==password)
    //             res.send(user);
    //     }
    // });

    app.get("/api/user/:userId", function(req, res) { //findUserById
        var id = req.params["userId"];
        console.log(id);
        for(var i=0; i<users.length; i++) {
            if(users[i]._id == id) {
                console.log(users[i]);
                res.send(users[i]);
            }
        }
    });

    app.put("/api/user/:userId", function(req, res) { //updateUser
        var id = req.params["userId"];
        var user = req.body;
        for(var u in users) {
            var user1 = users[u];
            if(user1._id == id) {
                user1.username = user.username;
                user1.password = user.password;
                user1.firstName = user.firstName;
                user1.lastName = user.lastName;
            }
        }
        res.json(users);
    });

    app.delete("/api/user/:userId", function(req, res) { //deleteUser
        var id = req.params["userId"];
        for(var i=0; i<users.length; i++) {
            if(users[i]._id == id)
                users.splice(i, 1);
        }
        res.send(users);
    });
}