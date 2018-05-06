const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(() =>
  mongoose
    .connect('mongodb://localhost/users_test')
    .catch(err => console.warn('Warning', err))
);

beforeEach(() =>
  // Workaround for a scenario where you have to manually
  // create 'users' collection inside mongoDB
  mongoose.connection
    .createCollection('users')
    .then(() => mongoose.connection.dropCollection('users'))
    .catch(err => console.warn('Failed to clean up users collection', err)));
