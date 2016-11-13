/**
 * Created by CherylRuo on 10/22/16.
 */
module.exports = function (app, model) {
    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', unregisterUser);

    function unregisterUser(req, res) { // delete
        model
            .deleteUser(req.params.userId)
            .then(function(status){
                res.json(status);
            });
    }

    function updateUser(req, res) {
        model
            .updateUser(req.params.userId, req.body)
            .then(function(user) {
                res.json(user);
            });
    }

    function createUser(req, res) {
        model
            .createUser(req.body)
            .then(function(user) {
                res.json(user);
            });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if(username!=null && password==null) {
            findUserByUsername(req, res);
        }
        if(username!=null && password!=null) {
            findUserByCredentials(req, res);
        }
    }

    function findUserByCredentials(req, res) {
        model
            .findUserByCredentials(req.query.username, req.query.password)
            .then(function(user) {
                res.json(user);
            });
    }

    function findUserByUsername(req, res) {
        model
            .findUserByUsername(req.query.username)
            .then(function(user) {
                res.json(user);
            });
    }

    function findUserById(req, res) {
        console.log(req.params.userId);
        model
            .findUserById(req.params.userId)
            .then(function(user) {
                res.json(user);
            });
    }
};