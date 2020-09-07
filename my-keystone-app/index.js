const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { Text, Checkbox, Password } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const initialiseData = require('./initial-data');

const { KnexAdapter: Adapter } = require('@keystonejs/adapter-knex');
const PROJECT_NAME = 'my_keystone_app';
const adapterConfig = { knexOptions: { connection: 'postgres://postgres:1234@localhost:5432/my_keystone_project' } };




const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  onConnect: process.env.CREATE_TABLES !== 'true' && initialiseData,
});


const admin = new AdminUIApp();
// const admin = new AdminUIApp({ authStrategy });





const { User } = require("./models/user");
// const { Role } = require("./role");
// const { Post } = require("./post");

keystone.createList("User", User);
// keystone.createList("Role", Role);
// keystone.createList("Post", Post);


const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField: 'username', // default: 'email'
    secretField: 'password', // default: 'password'
  },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      adminPath: '/admin',
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      // authStrategy,
    }),
  ],
};


// const { Keystone } = require('@keystonejs/keystone');
// const { Text, Password } = require('@keystonejs/fields');
// const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
// const { AdminUIApp } = require('@keystonejs/app-admin-ui');

// const keystone = new Keystone();

// keystone.createList('User', {
//   fields: {
//     username: { type: Text },
//     password: { type: Password },
//   },
// });

// const authStrategy = keystone.createAuthStrategy({
//   type: PasswordAuthStrategy,
//   list: 'User',
//   config: {
//     identityField: 'username', // default: 'email'
//     secretField: 'password', // default: 'password'
//   },
// });

// // Enable Admin UI login by adding the authentication strategy
// // const admin = new AdminUIApp({ authStrategy });
// const admin = new AdminUIApp();