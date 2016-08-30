
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('league_users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('league_users').insert({joined:true, league_id :1, user_id: 1}),
        knex('league_users').insert({joined:true, league_id: 1, user_id: 2 }),
        knex('league_users').insert({joined:true, league_id: 1, user_id: 3 }),
        knex('league_users').insert({joined:true, league_id: 1, user_id: 4 }),
        knex('league_users').insert({joined:true, league_id: 1, user_id: 5 }),
        knex('league_users').insert({joined:false, league_id: 1, user_id: 6 }),
        knex('league_users').insert({joined:true, league_id: 1, user_id: 7 }),
        knex('league_users').insert({joined:true, league_id: 1, user_id: 8 }),
        knex('league_users').insert({joined:true, league_id: 1, user_id: 9 }),
        knex('league_users').insert({joined:true, league_id: 1, user_id: 10}),

        knex('league_users').insert({joined:true, league_id: 2, user_id: 1}),
        knex('league_users').insert({joined:false, league_id: 2, user_id: 2}),
        knex('league_users').insert({joined:true, league_id: 2, user_id: 3}),
        knex('league_users').insert({joined:true, league_id: 2, user_id: 4}),
        knex('league_users').insert({joined:true, league_id: 2, user_id: 5}),
        knex('league_users').insert({joined:true, league_id: 2, user_id: 6}),
        knex('league_users').insert({joined:true, league_id: 2, user_id: 7}),
        knex('league_users').insert({joined:true, league_id: 2, user_id: 8}),
        knex('league_users').insert({joined:true, league_id: 2, user_id: 9}),
        knex('league_users').insert({joined:true, league_id: 2, user_id: 10}),
      ]);
    });
};
