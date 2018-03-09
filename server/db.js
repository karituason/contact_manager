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
               return res.json(docs);
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
                return res.json(docs);
            }
    });
};

exports.getUserDetail= function(req, res){
    users.findOne({username: req.body.username}, function (err, docs){
        if (err) {return err}
        if (docs) {
            return res.json(docs);
        }
    })
}

exports.getUserLoginDetail = function(req, res){
    userLogin.findOne({username: req.body.username}, function (err, docs){
        if (err) {return err}
        if (docs) {
            return res.json(docs);
        }
    })
}

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

function createUserDetail(data){
    users.create({
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            numContacts: 0
        },
            function(err, docs){
                if (docs){
                    return true;
                }
                return false;
            }
        );
}

function createUserLogin(data){
    userLogin.create({
        username: data.username,
        password: data.password,
        userType: "user"
    }, function(err, docs){
        if (docs){
            return true;
        }
        return false;
    })
}

exports.createUser = function(req, res){
    if(!userExists(req.body.username) && createUserDetail({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }) && createUserLogin({
            username: req.body.username,
            password: req.body.password,
        })){
            return res.json({result: true});
    } else {
        return res.json({result: false});
    }
}

function updateUserLogin(data){
    userLogin.update({username:data.username}, {$set:{
        password: data.password
    }}, function(err,docs){
        if (docs){
            return true;
        }
    })
    return false;
}

function updateUserDetails(data){
    users.update({username:data.username}, {$set:{
        firstname: data.firstname,
        lastname: data.lastname
    }})
    return false;
}
exports.updateUser = function(req, res){
    if (userExists(req.body.username) && updateUserLogin() && updateUserDetails){
        //update
        return res.json({result: false});
    } else {
        //send not update message
        return res.json({result: false});
    }
}

exports.getContacts = function(req,res){
    contact.find({username:req.body.username},'firstname lastname phone email',function(err,docs){
        console.log(req.body.username);
        if (err){return err;}
        if (docs){
            console.log(docs);
            return res.json(docs);
        }
    })
}

exports.getContact = function(req,res){
    contact.findOne({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email
    }, function(err, docs){
        if (err){return err;}
        if (docs){
            return res.json(docs);
        }
    })
}

exports.createContact = function(req,res){
    contact.create({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email
    }, function(err, docs){
        if (err){return err;}
        if (docs){
            users.update({username: req.body.username}, {$set:{
                numContacts: req.body.numContacts
            }}, function(err, docs){});
            return res.json(docs);
        }
    })
}

exports.updateContact = function(req, res){
    contact.update({username: req.body.username}, {$set:{
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        phone: req.body.phone,
        email: req.body.email
    }}, function(err, docs){
        if (err) {return err}
        if (docs){
            return res.json(docs);
        }
    })
}

function deleteUserLogin(user){
    userLogin.deleteMany({username: user}, function(err, docs){});
}

function deleteUserDetail(username){
    users.deleteMany({username: user}, function(err, docs){});
}

function deleteUserContacts(username){
    contact.deleteMany({username: user}, function(err, docs){});
}

exports.deleteUser= function(req,res){
    deleteUserLogin(req.body.username);
    deleteUserDetail(req.body.username);
    deleteUserContacts(req.body.username);
}

exports.deleteContact = function(req,res){
    contact.deleteOne({
        username: req.body.username,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        phone: req.body.phone,
        email: req.body.email
    }, function (err, docs){
        if (err){return err}
        if (docs){
            users.update({username:req.body.username}, 
                {$set:{numContacts:req.body.numContacts}},
                function (err, docs){}
            )
            res.json(docs);
            
        }
    })
}