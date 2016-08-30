var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var models = require('../models');
var Bookshelf = require('bookshelf')(knex);

router.get('/', function(req, res, next){
  var Leagues = Bookshelf.Collection.extend({
    model: models.League
  });
  models.User.forge({id: req.decodedUser.id}).fetch({withRelated: ['leagues', 'leagues.drafts', 'leagues.users', 'leagues.invitedUsers']}).then(function(leagues){
    if(!leagues){
      res.status(200).json({error: false, leagues:[]});
    }else{
      res.status(200).json({error: false, userLeagues: leagues});
    }
  }).catch(function(error){
    res.status(500).json({error: true, data: error});
  });
});

router.post('/', function(req, res, next){
  console.log(req.body);
  var league = {
    name: req.body.name,
    number_of_teams: parseInt(req.body.teams),
    roster_size: parseInt(req.body.rosterSize),
  };

  knex('leagues').insert(league).returning('id').then(function(id){
    league.id = id[0];
    knex('league_users').insert({user_id: req.decodedUser.id, league_id: league.id, league_admin: true, joined: true}, ['id']).then(function(){
      var promises = req.body.emails.map(function(email){
        return new Promise(function(resolve, reject){
          knex('users').select().where({email: email}).first().then(function(user){
            if(!user){
              knex('invited_emails').insert({league_id: league.id, email: email}).returning('id').then(function(id){
                resolve(id);
              }).catch(function(error){
                reject(error);
              });
            }else{
              knex('league_users').insert({user_id: user.id, league_id: league.id}).returning('id').then(function(id){
                resolve(id);
              }).catch(function(error){
                reject(error);
              });
            }
          });
        });
      });
      Promise.all(promises).then(function(results){
        res.status(200).json({error: false, league: league});
      }).catch(function(error){
        res.status(200).json({error: true, data: error});
      });
    });
  });
});


module.exports = router;
