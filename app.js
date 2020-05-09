const express = require("express");
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}));
const https = require("https");
var _ = require('lodash');

app.use(express.static("public"));

var tannen = {
  email: "Tannenhall@yahoo.com",
  password: "Bentley1@"
}
var chris = {
  email: "Chrisjhall@yahoo.com",
  password: "dad123"
}

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/login", function(req, res){
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", function(req, res){
  var email = _.capitalize(req.body.email);
  var password = req.body.password;
  if(email === tannen.email || email === chris.email){
    res.sendFile(__dirname + "/loggedIn.html");
  }
  else{
    console.log("no");
  }
});

app.listen(process.env.PORT || 3000, function(){
console.log("Server running");
});
