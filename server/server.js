var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var session = require('express-session');
var apiRoutes = require('./routes/apiRoutes.js');
var expressWs = require('express-ws')(app);
var bodyParser = require('body-parser')

active_users = []

// connect your database below
// mongoose.connect("");

app.use(bodyParser.json());
app.use(session({secret: 'ssshhhhh'}));
app.use('/static',express.static(path.join(__dirname,'../public/build/')))

app.use('/api',apiRoutes);

app.ws('/', (ws,req) => {
  active_users[req.session.identity]=ws;
  res.end('/');
});

app.get('*',function(req,res){
  if(!req.session.identity){
    req.session.identity = new Date().getTime() + '' +parseInt(Math.random()*10000000)
  }
  res.sendFile(path.join(__dirname,'../public/build/','index.html'));
});

app.listen(8080);
