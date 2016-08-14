exports.up = function(knex, Promise) {
  return knex.schema.createTable('drafts', function(drafts){
    drafts.increments().primary();
    drafts.string('name');
    drafts.integer('number_of_teams');
    drafts.integer('roster_size');
  }).createTable('rounds', function(rounds){
    rounds.increments().primary();
    rounds.integer('user_id').references('id').inTable('users').onDelete('cascade').notNullable();
    rounds.integer('league_id').references('id').inTable('leagues').onDelete('cascade').notNullable();
    rounds.boolean('league_admin');
  }).createTable('picks', function(picks){
    picks.increments().primary();
    picks.integer('player_id').references('id').inTable('players').onDelete('cascade').notNullable();
    picks.integer('user_id').references('id').inTable('users').onDelete('cascade').notNullable();
    picks.integer('round_id').references('id').inTable('rounds').onDelete('cascade').notNullable();
    picks.boolean('keeper');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('picks').dropTable('rounds').dropTable('drafts');
};
