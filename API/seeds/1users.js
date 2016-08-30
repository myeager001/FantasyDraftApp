
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({first_name: 'Mike2', last_name: 'yeage2', email: 'm.yeager002@gmail.com', password_hash:'1234'}),
        knex('users').insert({first_name: 'Mike3', last_name: 'yeager3', email: 'm.yeager003@gmail.com', password_hash:'1234'}),
        knex('users').insert({first_name: 'Mike4', last_name: 'yeager4', email: 'm.yeager004@gmail.com', password_hash:'1234'}),
        knex('users').insert({first_name: 'Mike5', last_name: 'yeager5', email: 'm.yeager005@gmail.com', password_hash:'1234'}),
        knex('users').insert({first_name: 'Mike6', last_name: 'yeager6', email: 'm.yeager006@gmail.com', password_hash:'1234'}),
        knex('users').insert({first_name: 'Mike7', last_name: 'yeager7', email: 'm.yeager007@gmail.com', password_hash:'1234'}),
        knex('users').insert({first_name: 'Mike8', last_name: 'yeager8', email: 'm.yeager008@gmail.com', password_hash:'1234'}),
        knex('users').insert({first_name: 'Mike9', last_name: 'yeager9', email: 'm.yeager009@gmail.com', password_hash:'1234'}),
        knex('users').insert({first_name: 'Mike10', last_name: 'yeager10', email: 'm.yeager0010@gmail.com', password_hash:'1234'}),
        knex('users').insert({first_name: 'Mike', last_name: 'yeager', email: 'm.yeager001@gmail.com', password_hash:'$2a$10$xfwWW.IA5En3wlfd7f8.fOiJ11flOuVZ6r1jIShpkRMI6EWGQUDY2'}),
      ]);
    });
};
