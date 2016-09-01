var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var models = require('../models');
var Bookshelf = require('bookshelf')(knex);

router.get('/:id', function(req, res, next){
  res.status(200).json({
    error: false,
    id: req.params.id,
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
      res.status(200).json({
        error: false,
        draft_id: id,
      });
    }).catch(function(error){
      res.status(500).json({error: true, data: error});
  }).catch(function(error){
    res.status(500).json({error: true, data: error});
  });
});
});

module.exports = router;
