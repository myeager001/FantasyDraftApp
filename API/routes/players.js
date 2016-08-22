var express = require('express');
var router = express.Router();
var request = require('request');
var knex = require('../db/knex');
require('dotenv').load();

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('players').select().then(function(players, error){
    if(error){
      return res.status(500).json({
        error: true,
        message: 'Internal service error please try again later'
      });
    }

    return res.status(200).json({
      error: false,
      players: players
    })
  })
});

router.delete('/', function(req, res, nex) {
  knex('players').delete().then(function(){
    knex('teams').delete().then(function(){
      res.status(200).json({
        error: false,
        message: 'Succsessfully updated the database'
      });
    })
  })
})

// TODO: need to ad super admin privlages and upsert
// instead of  insert where not exist
router.get('/updatedatabase', function(req, res, next) {
  if(!req.decodedUser.super_admin){
    return res.json(403, {
      error: true,
      message: 'You are not permitted to access this resource',
    })
  }


  var options = {
    url : 'https://api.fantasydata.net/nfl/v2/json/Teams',
    headers: {
      'Ocp-Apim-Subscription-Key' : process.env.NFL_API_KEY,
    }
  }

  request(options, function(error, response, body){
    if(error || !body){
      res.json(500, {
        error: true,
        message: 'there was an error accessing our data partner please try again later'
      });
    }else{
      var teams = JSON.parse(body);

      teamPromises = [];
      teams.forEach(function(team){
        // if(team.Key != 'GB'){
        //   return;
        // }
        console.log(team);
        console.log('//////////////////////////////////////////////////////////////////////////////////')
        teamInfo = {
          api_key: team.Key,
          full_name: team.FullName,
          conference: team.Conference,
          division: team.Division
        };
        var teamJob = new Promise(function(resolve, reject){
          knex('teams').insert(teamInfo, 'id').whereNotExists(function() {
            return this.select(knex.raw(1)).from('teams').where('api_key', '=', teamInfo.api_key);
          }).then(function(results){
            console.log(results);
            options.url = 'https://api.fantasydata.net/nfl/v2/JSON/Players/'+ teamInfo.api_key;
            request(options, function(error, response, body){
              if(error || !body){
                reject('there was an error accessing our data partner please try again later');
              }
              var players = JSON.parse(body);

              playerPromises = [];

              players.forEach(function(player) {
                console.log(results)
                playerInfo = {
                  api_id : player.PlayerID,
                  team_id : results[0],
                  first_name : player.FirstName,
                  last_name : player.LastName,
                  fantasy_position: player.FantasyPosition,
                  active: player.Active
                }
                var playerJob = new Promise(function(resolve, reject){
                  knex('players').insert(playerInfo).whereNotExists(function() {
                    return this.select(knex.raw(1)).from('teams').where('api_id', '=', player.api_id);
                  }).then(function(results){
                    resolve(results)
                  });
                });
                playerPromises.push(playerJob);

              });
              Promise.all(playerPromises).then(function(){
                resolve();
              })
            });
          });
        })
        teamPromises.push(teamJob);
      });
      Promise.all(teamPromises).then(function(){
        res.status(200).json({
          error: false,
          message: 'Succsessfully updated the database'
        });
      })
    }
  });
});



module.exports = router;
