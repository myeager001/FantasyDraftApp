var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var models = require('../models');
var Bookshelf = require('bookshelf')(knex);

router.get('/:id', function(req, res, next){
  models.Draft.forge({id: req.params.id}).fetch({withRelated: ['rounds','rounds.picks', 'rounds.picks.player', 'draftOrders',  'league']})
  .then(function(draft){
    res.status(200).json({error: false, draft: draft});
  }).catch(function(error){
    res.status(500).json({error: true, message: error});
  });
});

router.post('/', function(req, res, next){
  console.log(req.body);
  knex('drafts').insert({league_id: req.body.league_id, year: req.body.year})
  .returning('id').then(function(id){
    id = id[0];
    var info = req.body.users.map(function(user){
      user.draft_id = id;
      return user;
    });
    console.log(info);
    knex('draft_orders').insert(info).then(function(user){
      return res.status(200).json({
        error: false,
        draft_id: id,
      });
    }).catch(function(error){
      return  res.status(500).json({error: true, data: error});
    });
  }).catch(function(error){
    return res.status(500).json({error: true, data: error});
  });
});

router.post('/startDraft', function(req, res, next){
  knex('drafts').update({secret: req.body.secret}, 'league_id')
  .where({id: req.body.draft_id}).then(function(leagueId){
    leagueId = leagueId[0];
    knex('leagues').select().where({id: leagueId}).then(function(league){
      league = league[0];
      var size = league.roster_size;
      var rounds = [];
      var x = 0;
      while( x < size){
        rounds.push(x);
        x++;
      }
      var data = rounds.map(function(item, index){
          roundObj = {};
          roundObj.round_number = index + 1;
          roundObj.draft_id = req.body.draft_id;
          return roundObj;
      });

      knex('rounds').insert(data).returning(['id', 'round_number']).then(function(rounds){
        knex('draft_orders').select().where({draft_id: req.body.draft_id}).then(function(draft_orders){
          var picks = rounds.map(function(round, index){
            return draft_orders.map(function(drafter){
              var pickObj = {};
              pickObj.round_id = round.id;
              pickObj.user_id = drafter.user_id;
              if(round.round_number % 2 === 0){
                pickObj.place_in_round = league.number_of_teams + 1 - drafter.draft_position;
              }else{
                pickObj.place_in_round = drafter.draft_position;
              }
              return pickObj;
            });
          });
          var merged = [].concat.apply([], picks);
          knex('picks').insert(merged).then(function(){
            console.log('here');
            models.Draft.forge({id: req.body.draft_id}).fetch({withRelated: ['rounds', 'rounds.picks', 'rounds.picks.player', 'draftOrders', 'draftOrder.user']})
            .then(function(draft){
              return res.status(200).json({error: false, draft: draft});
            });
          });

        });
      });
    });
  });
  return res.status(500).json({error: true, message: 'shit broke man'});
});

module.exports = router;
