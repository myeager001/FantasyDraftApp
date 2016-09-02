exports.up = function(knex, Promise) {
  return knex.schema.table('drafts', function(drafts){
    drafts.string('secret');
    drafts.dateTime('compleated');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('drafts', function(drafts){
    drafts.dropColumn('secret');
    drafts.dropColumn('compleated');
  })
};
