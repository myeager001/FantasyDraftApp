exports.up = function(knex, Promise) {
  return knex.schema.createTable('draft_orders', function(order){
    order.increments();
    order.integer('user_id').references('id').inTable('users').onDelete('cascade').notNullable();
    order.integer('draft_id').references('id').inTable('drafts').onDelete('cascade').notNullable();
    order.integer('draft_position');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('draft_orders');
};
