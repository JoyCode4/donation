const passport=require("passport");
const User=require("../models/user");
const localStratrgy=require("passport-local").Strategy;


// Authentication using Passport
passport.use(new localStratrgy({
        usernameField : "username"
    },
    function(username,password,done){
        User.findOne({username:username},(err,user)=>{
            if(!user || user.password!=password){
                console.log("Invalid Username/Password");
                return done(null,false);
            }

            return done(null,user);
        });
    }

));

passport.serializeUser(function(user,done){
    done(null,user.id);
})

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Errorin Finding User --> Passport");
            return done(err);
        }
        return done(null,user);
    })
})

// check if the user is authenticated
passport.checkAuthentication=function(req,res,next){
    // if the user is signed in, the pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign_in');
}

passport.setAuthenicatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in the user from the session cookie and we are just sending this to the locals for the views
        res.locals.user=req.user;
    }
    next();
}

