var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/cm_users");

var Schema = mongoose.Schema;

var loginSchema = new Schema({
    username: String,
    password: String,
    userType: String
});

var userLogin = mongoose.model('users', loginSchema);

var userSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    numContacts: Number
});

var user = mongoose.model('user_detail', userSchema);

var contactSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    phone: Number,
    email: String
})

var contact = mongoose.model('contacts', contactSchema);

exports.login = function(req, res){
    userLogin.findOne(
        {username: req.body.username, password: req.body.password}, 
        'username userType',
        function(err,docs){
            if (err) {return err;}
            if ((docs)){
                res.json(docs);
            }
        });
};

exports.getUsers = function(req, res){
    user.find(
        {}, 
        'username firstname lastname numContacts',
        function(err,docs){
            if (err) {return err;}
            if ((docs)){
                res.json(docs);
            }
        });
};