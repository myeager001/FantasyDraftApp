
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('drafts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('drafts').insert({year: 2016, league_id:1}),
        knex('drafts').insert({year: 2016, league_id:2}),
        knex('drafts').insert({year: 2016, league_id:3})
      ]);
    });
};
