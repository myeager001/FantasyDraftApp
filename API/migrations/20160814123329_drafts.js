exports.up = function(knex, Promise) {
  return knex.schema.createTable('drafts', function(drafts){
    drafts.increments().primary();
    drafts.integer('year');
    drafts.integer('league_id').references('id').inTable('leagues').onDelete('cascade').notNullable();
  }).createTable('rounds', function(rounds){
    rounds.increments().primary();
    rounds.integer('draft_id').references('id').inTable('drafts').onDelete('cascade').notNullable();
    rounds.integer('round_number');
  }).createTable('picks', function(picks){
    picks.increments().primary();
    picks.integer('player_id').references('id').inTable('players').onDelete('cascade')
    picks.integer('user_id').references('id').inTable('users').onDelete('cascade').notNullable();
    picks.integer('round_id').references('id').inTable('rounds').onDelete('cascade').notNullable();
    picks.integer('place_in_round')
    picks.boolean('keeper');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('picks').dropTable('rounds').dropTable('drafts');
};
