
exports.up = function(knex, Promise) {
  return knex.schema.createTable('leagues', function(leagues){
    leagues.increments().primary();
    leagues.string('name');
    leagues.integer('number_of_teams');
    leagues.integer('roster_size');
    leagues.timestamps();
  }).createTable('league_users', function(league_users){
  league_users.increments().primary();
  league_users.integer('user_id').references('id').inTable('users').onDelete('cascade').notNullable();
  league_users.integer('league_id').references('id').inTable('leagues').onDelete('cascade').notNullable();
  league_users.boolean('league_admin');
  league_users.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('league_users').dropTable('leagues');
};
