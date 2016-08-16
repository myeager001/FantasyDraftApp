exports.up = function(knex, Promise) {
  return knex.schema.createTable('teams', function(teams){
    teams.increments().primary();
    teams.string('full_name');
    teams.string('api_key');
    teams.string('conference');
    teams.string('division');
    teams.timestamps();
  }).createTable('players', function(players){
  players.increments().primary();
  players.integer('api_id').notNullable();
  players.integer('team_id').references('id').inTable('teams').onDelete('cascade').notNullable();
  players.string('first_name').notNullable();
  players.string('last_name').notNullable();
  players.string('fantasy_position').notNullable();
  players.boolean('active').notNullable();
  players.float('avg_draft_position');
  players.timestamps();
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('players').dropTable('teams');
};
