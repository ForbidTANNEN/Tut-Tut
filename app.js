const express = require("express");
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}));
const https = require("https");

app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});


app.listen(process.env.PORT || 3000, function(){
console.log("Server running");
});
