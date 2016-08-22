var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('users')
});

module.exports = router;
