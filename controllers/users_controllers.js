const User=require('../models/user');

module.exports.profile=function(req,res){
    User.find({},(err,users)=>{
        console.log(users);
        return res.render("profile",{
            title:"Creator",
            all_users:users
        });
    })
        
}

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }
    return res.render("sign-in",{
        title:"Sign In"
    })
}

module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }
    return res.render("sign-up",{
        title:"Sign Up"
    })
}

module.exports.create=(req,res)=>{
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('/');
    }
    User.findOne({username:req.body.username},(err,user)=>{
        if(err){
            console.log("Error in Credentials");
            return;
        }
        if(!user){
            User.create(req.body,(err,user)=>{
                if(err){
                    console.log("Error in Signing Up");
                    return ;
                }
                return res.redirect("/users/sign-in");
            })
        }
        else{
            return res.redirect("/");
        }
    })
}

module.exports.createSession = (req,res)=>{
    return res.redirect("/users/profile");
}

module.exports.destroySession = function(req,res){
    // code is different from sir(callback function of req.logout)
    req.logout((err)=>{
        if(err){
            console.log("Session destroy is not done, Error : "+err);
        }
    });
    // req.flash("success","Logged Out Successfully")

    return res.redirect("/");
}