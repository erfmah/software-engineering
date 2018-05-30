require('dotenv').load();
var express = require('express');
var path = require('path');
var fs = require('fs');
var morgan     = require("morgan");
var bodyParser = require('body-parser');
var jwt = require("jsonwebtoken");
var expressJwt = require('express-jwt');
var mongoose   = require("mongoose");
mongoose.connect('mongodb://localhost/vuelogin');
var User = require('./models');

var app = express();
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","POST,GET");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

var auth = expressJwt({ secret: process.env.JWT_SECRET });

app.post('/api/login', function(req, res) {
  User.findOne({name: req.body.name, password: req.body.password}, function(err, user) {
    if (err) {
      res.send({
        type: false,
        data: "Error occured: " + err
      });
    } else {
      if (user) {
        var expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
        var token = jwt.sign({
          _id: user._id,
          email: user.email,
          name: user.name,
          exp:parseInt(expiry.getTime()/1000)
        },process.env.JWT_SECRET);
        res.send({
          type: true,
          data: user,
          token: token
        });
      } else {
        res.send({
          type: false,
          data: "用户未注册"
        });
      }
    }
  });
});

app.post('/api/logout',auth, function(req, res) {
  res.send({
    type: "1"
  })
});

app.post('/api/reg', function(req, res) {
  User.findOne({name: req.body.name, password: req.body.password}, function(err, user) {
    if (err) {
      res.send({
        type: false,
        data: "Error occured: " + err
      });
    } else {
      if (user) {
        res.send({
          type: false,
          data: "用户已注册"
        });
      } else {
        var userModel = new User();
        userModel.name = req.body.name;
        userModel.password = req.body.password;
        userModel.save(function(err, user) {
          user.save(function(err, user1) {
            var expiry = new Date();
            expiry.setDate(expiry.getDate() + 7);
            var token = jwt.sign({
              _id: user._id,
              email: user.email,
              name: user.name,
              exp:parseInt(expiry.getTime()/1000)
            },process.env.JWT_SECRET);
            res.send({
              type: true,
              data: user,
              token: token
            });
          });
        })
      }
    }
  });
});

app.use(function(err, req, res, next) {
  if (err.name == 'UnauthorizedError') {
    res.status(401);
    res.send({ message: err.name + ":" + err.message });
  }
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

