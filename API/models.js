var knex = require('./db/knex');
var Bookshelf = require('bookshelf')(knex);

var model = {};

//model for getting a user
model.User = Bookshelf.Model.extend({
    tableName: 'users',
    leagues: function (){
      return this.belongsToMany(model.League).through(model.LeagueUser);
    },
    draftOrders: function (){
      return this.hasMany(model.DraftOrder);
    }
});

model.InvitedUser = Bookshelf.Model.extend({
    tableName: 'invited_emails',
    league: function(){
      this.belongsTo(model.League);
    }
});

model.LeagueUser = Bookshelf.Model.extend({
    tableName: 'league_users',
    user: function (){
      return this.belongsTo(model.User);
    },
    league: function (){
      return this.belongsTo(model.League);
    },
});

model.League = Bookshelf.Model.extend({
    tableName: 'leagues',
    invitedUsers: function (){
      return this.hasMany(model.InvitedUser);
    },
    users: function (){
      return this.belongsToMany(model.User).through(model.LeagueUser);
    },
    drafts: function (){
      return this.hasMany(model.Draft);
    },
});

model.Draft = Bookshelf.Model.extend({
    tableName: 'drafts',
    league: function (){
      return this.belongsTo(model.League);
    },
    rounds: function (){
      return this.hasMany(model.Round).query('orderBy', 'round_number', 'asc');
    },
    draftOrders: function (){
      return this.hasMany(model.DraftOrder).query('orderBy', 'draft_position', 'asc');
    }
});

model.Round = Bookshelf.Model.extend({
    tableName: 'rounds',
    draft: function (){
      return this.belongsTo(model.Draft);
    },
    picks: function (){
      return this.hasMany(model.Pick).query('orderBy', 'place_in_round', 'asc');
    },
});

model.Pick = Bookshelf.Model.extend({
    tableName: 'picks',
    round: function (){
      return this.belongsTo(model.Round);
    },
    player: function (){
      return this.belongsTo(model.Player);
    },
});

model.Player = Bookshelf.Model.extend({
    tableName: 'players',
    picks: function (){
      return this.hasMany(model.Pick);
    },
    team: function (){
      return this.belongsTo(model.Team);
    },
});

model.Team = Bookshelf.Model.extend({
    tableName: 'players',
    players: function (){
      return this.hasMany(model.Player);
    },
});

model.DraftOrder = Bookshelf.Model.extend({
    tableName: 'draft_orders',
    draft: function(){
       this.belogsTo(model.Draft);
     },
    user: function(){
       this.belongsTo(model.User);
     }
});


module.exports = model;
