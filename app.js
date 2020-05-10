const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({
  extended: true
}));
const https = require("https");
var _ = require('lodash');
var sha256 = require('js-sha256');

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/tut", {
  useNewUrlParser: true
});

// ACCount

const accountSchema = {
  email: String,
  password: String,
  age: String,
  f_name: String,
  l_name: String
};

const Account = mongoose.model("Account", accountSchema);


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/login", function(req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.get("/signup", function(req, res) {
  res.sendFile(__dirname + "/signUp.html");
});

app.post("/signup", function(req, res){
  var s_email = _.capitalize(req.body.email);
  var s_password = sha256("4i5u4kbfjg" + req.body.password);
  var s_age = req.body.age;
  var s_f_name = req.body.f_name;
  var s_l_name = req.body.l_name;
  const newAcc = new Account({
    email: s_email,
    password: s_password,
    age: s_age,
    f_name: s_f_name,
    l_name: s_l_name
  });
  newAcc.save();
  res.redirect("/login");
});


app.post("/login", function(req, res){
  var email = _.capitalize(req.body.email);
  var password = sha256("4i5u4kbfjg" + req.body.password);
  Account.findOne({email: email}, function(err, foundAccounts){
    if(err){
      console.log(err);
    }
    else if(foundAccounts === null){
      console.log("No Account Found");
    }
    else{
      if(password == foundAccounts.password){
        console.log("Correct Username and password");
      }else{
        console.log("Wrong Pass Right Email: Pass entered: "+foundAccounts.password);
      }
    }
  });
});

    app.listen(process.env.PORT || 3000, function() {
      console.log("Server running");
    });
