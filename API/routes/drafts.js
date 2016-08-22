var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var models = require('../models');
var Bookshelf = require('bookshelf')(knex);

router.get('/:id', function(req, res, next){
  res.status(200).json({
    error: false,
    id: req.params.id,
  })
});

module.exports = router;
