var express = require('express');
var session = require('express-session');
var app = express();


var user = null;
app.get('/get-session', (req, res) => {
    try {
        user = req.session.user;
    }
    catch {
        console.log("No user found");
    }
});
console.log(user);