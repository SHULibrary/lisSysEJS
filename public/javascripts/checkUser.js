var express = require('express');
var session = require('express-session');
var app = express();

var button = document.getElementById("testButton");
button.onclick(check());

function check() {
    console.log("HUH");
    app.get('/', (req, res) => {
        if (req.session.user) {
          console.log(req.session.user);
        } else {
          console.log('Not logged in');
        }
      });
}
