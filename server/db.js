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

        } else {
            return res.json(null);
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
    console.log("detail create")
    users.create({
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            numContacts: 0
        },
            function(err, docs){
                if (docs){
                    console.log("here")
                    console.log(docs)
                } if (err){
                    console.log("here")
                }
                console.log("out of if")
            }
        );
}

function createUserLogin(data){
    console.log("login create");
    userLogin.create({
        username: data.username,
        password: data.password,
        userType: "user"
    }, function(err, docs){
        if (docs){
        }
    })
}

exports.createUser = function(req, res){
    console.log("in create user")
    
    console.log("detail create")
    users.create({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            numContacts: 0
        },
            function(err, docs){
                if (docs){
                    console.log("user detail created")
                    userLogin.create({
                        username: req.body.username,
                        password: req.body.password,
                        userType: "user"
                    }, function(err, docs){
                        if (docs){
                            return res.json(true);
                        }
                        else{
                            deleteUserLogin(req.body.username);
                            deleteUserDetail(req.body.username);
                            return res.json(false);
                        }
                    })
                } if (err){
                    console.log("here")
                    return res.json(false);
                }
                console.log("out of if")
            }
        );

    /*createUserDetail({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }) 
    createUserLogin({
            username: req.body.username,
            password: req.body.password,
        })
            return res.json({result: true});
    } else {
        deleteUserLogin(req.body.username);
        deleteUserDetail(req.body.username);
        return res.json({result: false});

    }*/
}

exports.updateUser = function(req, res){
    userLogin.update({username:req.body.username}, {$set:{
        password: req.body.password
    }}, function(err,docs){
    })
    users.update({username:req.body.username}, {$set:{
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }}, function(err, docs){
    })
    return res.json(true);
}

exports.getContacts = function(req,res){
    contact.find({username:req.body.username},'firstname lastname phone email',function(err,docs){
        if (err){return err;}
        if (docs){
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
    console.log("in create")
    contact.create({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email
    }, function(err, docs){
        if (err){return res.json(err);}
        if (docs){
            return res.json(docs);
        }
    })
}

exports.updateContact = function(req, res){
    console.log("in update")
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
    console.log("in delete user login")
    userLogin.deleteMany({username: user}, function(err, docs){
        if (docs){
            console.log("deleted");
        }
    });
}

function deleteUserDetail(username){
    console.log("in delete user detail")
    users.deleteMany({username: username}, function(err, docs){});
}

function deleteUserContacts(username){
    console.log("in delete user contacts")
    contact.deleteMany({username: username}, function(err, docs){});
}

exports.deleteUser= function(req,res){
    console.log("in delete user")
    deleteUserLogin(req.body.username);
    deleteUserDetail(req.body.username);
    deleteUserContacts(req.body.username);

    return res.json(true);
}

exports.deleteContact = function(req,res){
    console.log("deleting: "+req.body.firstname);
    contact.deleteOne({
        username: req.body.username,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        phone: req.body.phone,
        email: req.body.email
    }, function (err, docs){
        if (err){return err}
        if (docs){
            res.json(docs);
        }
    })
}