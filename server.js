const express = require('express');
const bodyparser = require('body-parser');
const passport = require('passport');
var Strategy = require("passport-facebook").Strategy;

passport.use(
    new Strategy({
         clientID : "2785599424827206",
         clientSecret : "20a3804746de6d64d3dd2aded1de131c",
         callbackURL : 'http://localhost:3000/login/facebook/return'
    },function(accessToken,refreshToken,profile,cb){
        return cb(null,profile);
    }));
 passport.serializeUser(function(user,cb){
     cb(null,user);
 });
 passport.deserializeUser(function(obj,cb){
    cb(null,obj);
})

//create express app
const app = express();

//set view
app.set('views',__dirname+'/views');
app.set("view engine","ejs");

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(bodyparser.urlencoded({extended:true}));
app.use(require('express-session')({secret:'lco app',resave : true,saveUninitialized:true}));

//route  - GET/
//@adesss
app.get("/",(req,res)=>{
    res.render("home",{user : req.user });
});
