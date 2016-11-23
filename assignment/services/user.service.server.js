/**
 * Created by CherylRuo on 10/22/16.
 */
module.exports = function (app, model) {
    var passport = require('passport');
    var FacebookStrategy = require('passport-facebook').Strategy;
    var bcrypt = require("bcrypt-nodejs");
    var LocalStrategy = require('passport-local').Strategy;
    var facebookConfig = {
        // clientID     : 1018543724921975,
        // clientSecret : 'ee9c588d03a79ee3349731f926e63cd9',
        // callbackURL  : 'http://localhost:3000/assignment/index.html',
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'name', 'email']
    };
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post  ('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post ('/api/register', register);
    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:userId', findUserById);
    app.get ('/api/loggedin', loggedin);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/#/user',
            failureRedirect: '/#/login'
        }));
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', unregisterUser);

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model
            .createUser(user)
            .then(
                    function(user){
                        if(user){
                            req.login(user, function(err) {
                                if(err) {
                                    res.status(400).send(err);
                                } else {
                                    res.json(user);
                                }
                            });
                        }
                    });
    }

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

    function facebookStrategy(token, refreshToken, profile, done) {
        model
            .findUserByFacebookId(profile.id)
            .then(function(user) {
                res.json(user);
            });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        model
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user.username === username && user.password === password) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }
};