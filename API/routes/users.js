var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


/* GET users listing. */
router.get('/', function(req, res, next) {

  if(!req.decodedUser.super_admin){
    return res.json(403, {
      error: true,
      message: 'You are not permitted to access this resource',
    })
  }

  knex('users').select().then(function(users, error){
    if(error){
      return res.status(500).json({
        error: true,
        message: 'Internal service error please try again later'
      });
    }
    return res.status(200).json({
      error: false,
      users: users,
    })
  })
});

module.exports = router;
