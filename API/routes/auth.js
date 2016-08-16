var express = require('express');
var router = express.Router();

var knex = require('../db/knex');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var saltRounds = 10;

router.post('/refreshToken', function(req, res, next) {

});

router.post('/signup', function(req, res, next) {
  if(!req.body.email || !req.body.password){
    res.status(500).json({
      error: true,
      message: 'There was a problem with the sign up please try again later.'
    });
  }
  knex('users').select().where('email', req.body.email).then(function(user){
    console.log('user', user);
    if(user && user.length > 0){
      res.status(500).json({
        error: true,
        message: 'The user already exist in the database.'
      });
    }

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      if(err){
        res.status(500).json({
          error: true,
          message: 'There was a problem with the sign up please try again later.'
        });
      }

      user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password_hash: hash
      };

      knex('users').insert(user, 'id').then(function(id){
        res.status(200).json({
          error: false,
          message: "Succsessfully signed up.  Please log in"
        });
      }).catch(function(err){
        res.status(500).json({
          error: true,
          message: 'There was a problem with the sign up please try again later.'
        });
      });

    });
  }).catch(function(err){
    res.status(500).json({
      error: true,
      message: 'There was a problem with the sign up please try again later.'
    });
  });
});

module.exports = router;
