const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(() =>
  mongoose
    .connect('mongodb://localhost/users_test')
    .catch(err => console.warn('Warning', err))
);

beforeEach(() =>
  // Workaround for a scenario where you have to manually
  // create collections inside mongoDB.
  // Mongoose normalizes collection names, so blogposts is
  // entirely in lowercase.
  ['users', 'comments', 'blogposts'].reduce(
    (chain, collection) =>
      chain
        .then(() => mongoose.connection.createCollection(collection))
        .then(() => mongoose.connection.dropCollection(collection))
        .catch(err =>
          console.warn(`Failed to clean up ${collection} collection`)
        ),
    Promise.resolve()
  ));
