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
    firstname: String,
    lastname: String,
    numContacts: Number
});

var users = mongoose.model('user_details', userSchema);

var contactSchema = new Schema({
    username: String,
    firstname: String,
    lastname: String,
    phone: Number,
    email: String
})

var contact = mongoose.model('contacts', contactSchema);

exports.login = function(req, res){
    console.log("getting login")
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
    console.log("getting users");
    users.find(
        {},
        "username firstname lastname numContacts",
        function(err,docs){
            if (err) {return err;}
            if ((docs)){
                res.json(docs);
            }
    });
};

function userExists(username){
    users.findOne(
        {username:req.body.username},
        function(err, docs){
            if (err) {return err;}
            if ((docs)){
                return true;
            } else {
                return false;
            }
        }
    )
}

exports.createUser = function(req, res){
    if(!userExists(req.body.username)){
        users.create({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            numContacts: req.body.numContacts
        },
            function(err, docs){
                if (err) {return err}
                if (docs){
                    res.json(docs);
                }
            }
        )
    } else {
        res.json({result: false});
    }
}