
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('leagues').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('leagues').insert({name: 'test1', number_of_teams: 14, roster_size:17 }),
        knex('leagues').insert({name: 'test2', number_of_teams: 12, roster_size:18 }),
        knex('leagues').insert({name: 'test3', number_of_teams: 10, roster_size:20 })
      ]);
    });
};
