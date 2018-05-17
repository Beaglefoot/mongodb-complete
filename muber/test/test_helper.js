const mongoose = require('mongoose');

before(() =>
  mongoose
    .connect('mongodb://localhost/muber_test')
    .catch(err => console.warn('Warning', err))
);

beforeEach(() =>
  mongoose.connection
    .createCollection('drivers')
    .then(() => mongoose.connection.dropCollection('drivers'))
    .then(() =>
      // Make sure indecies are created after collection drop
      mongoose.connection
        .collection('drivers')
        .ensureIndex({ 'geometry.coordinates': '2dsphere' })
    )
    .catch(err => console.warn('Failed to clean up drivers collection')));
