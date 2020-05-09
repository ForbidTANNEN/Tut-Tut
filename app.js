const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({
  extended: true
}));
const https = require("https");
var _ = require('lodash');

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/tut", {
  useNewUrlParser: true
});

// ACCount

const accountSchema = {
  email: String,
  password: String
};

const Account = mongoose.model("Account", accountSchema);

const tannen = new Account({
  email: "Tannenhall@yahoo.com",
  password: "Bentley1@"
});
const chris = new Account({
  email: "Chrisjhall@yahoo.com",
  password: "dad123"
});


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/login", function(req, res) {
  res.sendFile(__dirname + "/login.html");
});


app.post("/login", function(req, res){
  var email = _.capitalize(req.body.email);
  var password = req.body.password;
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
