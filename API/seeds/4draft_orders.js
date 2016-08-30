
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('draft_orders').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('draft_orders').insert({draft_id: 1, user_id: 1, draft_position: 1}),
        knex('draft_orders').insert({draft_id: 1, user_id: 2 ,draft_position: 2}),
        knex('draft_orders').insert({draft_id: 1, user_id: 3 ,draft_position: 3}),
        knex('draft_orders').insert({draft_id: 1, user_id: 4 ,draft_position: 4}),
        knex('draft_orders').insert({draft_id: 1, user_id: 5 ,draft_position: 5}),
        knex('draft_orders').insert({draft_id: 1, user_id: 6 ,draft_position: 6}),
        knex('draft_orders').insert({draft_id: 1, user_id: 7 ,draft_position: 7}),
        knex('draft_orders').insert({draft_id: 1, user_id: 8 ,draft_position: 8}),
        knex('draft_orders').insert({draft_id: 1, user_id: 9 ,draft_position: 9}),
        knex('draft_orders').insert({ draft_id: 1, user_id: 10, draft_position: 10}),

        knex('draft_orders').insert({ draft_id: 2, user_id: 1, draft_position: 1}),
        knex('draft_orders').insert({ draft_id: 2, user_id: 2 ,draft_position: 2}),
        knex('draft_orders').insert({ draft_id: 2, user_id: 3 ,draft_position: 3}),
        knex('draft_orders').insert({ draft_id: 2, user_id: 4 ,draft_position: 4}),
        knex('draft_orders').insert({ draft_id: 2, user_id: 5 ,draft_position: 5}),
        knex('draft_orders').insert({ draft_id: 2, user_id: 6 ,draft_position: 6}),
        knex('draft_orders').insert({ draft_id: 2, user_id: 7 ,draft_position: 7}),
        knex('draft_orders').insert({ draft_id: 2, user_id: 8 ,draft_position: 8}),
        knex('draft_orders').insert({ draft_id: 2, user_id: 9 ,draft_position: 9}),
        knex('draft_orders').insert({ draft_id: 2, user_id: 10, draft_position: 10}),
      ]);
    });
};
