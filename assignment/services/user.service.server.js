/**
 * Created by CherylRuo on 10/22/16.
 */
module.exports = function (app) {
    var users = [
        {_id: 123, username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: 234, username: "cheryl", password: "cheryl", firstName: "Cheryl", lastName: "Jia"},
        {_id: 345, username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: 456, username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];


    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', unregisterUser);

    function unregisterUser(req, res) { // delete
        var userId = req.params.userId;
        for (var i=users.length-1; i>=0; i--) {
            if (users[i]._id == userId) {
                users.splice(i, 1);
            }
        }
        res.send(200);
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.userId;
        for (var u in users) {
            if (users[u]._id == uid) {
                users[u] = user;
            }
        }
        res.send(200);
    }

    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime();
        users.push(user);
        res.send(user);
    }

    function findUser(req, res) {
        var query = req.query;
        if (query.password && query.username) {
            findUserByCredentials(req, res);
        } else if (query.username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        for (var u in users) {
            if (users[u].username === username &&
                users[u].password === password) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        for (var u in users) {
            if (users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function findUserById(req, res) {
        var userId = parseInt(req.params.userId);
        for (var u in users) {
            if (users[u]._id === userId) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }
};