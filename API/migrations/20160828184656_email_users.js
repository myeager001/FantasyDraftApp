
exports.up = function(knex, Promise) {
  return knex.schema.table('league_users', function(league_users){
    league_users.boolean('joined');
  }).createTable('invited_emails', function(invited_emails){
    invited_emails.increments();
    invited_emails.string('email');
    invited_emails.integer('league_id').references('id').inTable('leagues').onDelete('cascade').notNullable()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('invited_emails').table('league_users', function(league_users){
    league_users.dropColumn('joined')
  });
};
