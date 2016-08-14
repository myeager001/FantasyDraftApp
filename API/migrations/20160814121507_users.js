exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(users){
    users.increments().primary();
    users.string('first_name').notNullable();
    users.string('last_name').notNullable();
    users.string('email').unique().notNullable();
    users.string('password_hash').notNullable();
    users.string('image_url');
    users.boolean('super_admin');
    users.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
