var express = require('express');
var app = express();
var db = require('./db.js');

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.route('/')
    .get(function(req, res) {
          res.sendFile(__dirname + '/index.html');
});

//Authentication
app.route('/login').post(db.login);

//Admin
app.route('/admin/users').get(db.getUsers);
app.route('/admin/user').get(db.getUser);
app.route('/admin/users/add').post(db.createUser);
app.route('/admin/users/update').post(db.updateUser);
app.route('/admin/users/delete').get(db.deleteUser);

//User
app.route('/user/contacts').get(db.getContacts);
app.route('/user/contact').get(db.getContact);
app.route('/user/contact/add').post(db.createContact);
app.route('/user/contact/update').post(db.updateContact);
app.route('/user/contact/delete').post(db.deleteContact);

app.route('/testroute/:username')
    .get(function(req, res) {
        var user_name = (req.query.username);
        var user_name = (req.params.username);
        res.send("Hi, "+user_name+" Welcome to Edureka");
});
app.route('*')
    .get(function(req, res) {
        res.redirect('/');
});
module.exports = app;