var express = require('express');
var router = express.Router();
require('dotenv').load();
var knex = require('../db/knex');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var saltRounds = 10;

router.post('/token', function(req, res, next) {

  //make sure there is the right information
  if(!req.body.email || !req.body.password){
    res.status(403).json({
      error: false,
      message: 'Invalid user name or password.'
    });
    return;
  }

  //find the user
  knex('users').select().first().where('email', req.body.email).then(function(user){

    if(!user){
      res.status(403).json({
        error: false,
        message: 'Invalid user name or password.'
      });
      return;
    }

    bcrypt.compare(req.body.password, user.password_hash, function(err, response) {
        if(err || response === false){
          res.status(403).json({
            error: false,
            message: 'Invalid user name or password.'
          });
          return;
        }

        var token = jwt.sign(user, process.env.JWT_SECRET)
        res.status(200).json({
          error: false,
          token: token,
        });
        return;
    });
  }).catch(function(err){
    res.status(500).json({
      error: true,
      message: err
    });
    return;
  });
});

router.post('/signup', function(req, res, next) {
  if(!req.body.email || !req.body.password){
    res.status(500).json({
      error: true,
      message: 'There was a problem with the sign up please try again later.'
    });
    return;
  }
  knex('users').select().first().where('email', req.body.email).then(function(user){
    if(user){
      res.status(500).json({
        error: true,
        message: 'The user already exist in the database.'
      });
      return;
    }

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      if(err){
        res.status(500).json({
          error: true,
          message: 'There was a problem with the sign up please try again later.'
        });
        return;
      }

      user = {
        first_name: req.body.first_name || '',
        last_name: req.body.last_name || '',
        email: req.body.email,
        password_hash: hash,
      };

      knex('users').insert(user, 'id').then(function(id){
        console.log('here');
        knex('invited_emails').select('league_id').where({email: user.email}).then(function(entries){
          console.log(entries);
          if(entries.length === 0){
            return res.status(200).json({
              error: false,
              message: "Succsessfully signed up.  Please log in"
            });
          }

          var leagueUsers = entries.map(function(entry){
            leagueObject = {};
            leagueObject.league_id = entry.league_id
            leagueObject.user_id = id[0];
            return leagueObject;
          });
          console.log(leagueUsers);
          knex('league_users').insert(leagueUsers).then(function(){
            knex('invited_emails').delete().where({email: user.email}).then(function(){
              return res.status(200).json({
                error: false,
                message: "Succsessfully signed up.  Please log in"
              });
            }).catch(function(err){
              return res.status(500).json({
                error: true,
                message: 'There was a problem with the sign up please try again later.'
              });
            });
          }).catch(function(err){
            return res.status(500).json({
              error: true,
              message: 'There was a problem with the sign up please try again later.'
            });
          });
        }).catch(function(err){
          return res.status(500).json({
            error: true,
            message: 'There was a problem with the sign up please try again later.'
          });
        });
      }).catch(function(err){
        return res.status(500).json({
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
    return;
  });
});

module.exports = router;
