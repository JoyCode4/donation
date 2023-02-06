const express=require('express');
const port=8000;
const app=express();
const path=require('path');
// const expressLayouts = require("express-ejs-layouts");
const db=require("./config/mongoose");
// const MongoStore =require('connect-mongo');
const session=require("express-session");
const passport=require("passport");
const passportLocal=require("./config/passport-local-strategy");

app.use(express.urlencoded());

app.use(express.static("./assets"));

// app.use(expressLayouts);
// Use for css and js links extraction into the layouts
app.set("layout extractStyles",true)
app.set("layout extractScripts",true)


app.set("view engine", "ejs");
app.set("views",path.join(__dirname, '/views'));

app.use(session({
    name:"donation project",
    secret:"Jayesh",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100) //it is of the 100 minutes
    },
    // This code is different from sir
    // store:MongoStore.create({
    //     mongoUrl:'mongodb://0.0.0.0/Donation_project',
    //     autoRemove:'disabled'
    // },
    // function(err){
    //     console.log("Error od mongodb authentication : "+err || "connect-mongodb setup ok of authentication");
    // })
}))

app.use(passport.initialize());
app.use(passport.session());

// use express router
app.use("/",require("./routes/index"));

app.listen(port,(err)=>{
    if(err){
        console.log("Error in running Express Server : "+err);
    }
    console.log("The express server is running on the port : "+port);
});