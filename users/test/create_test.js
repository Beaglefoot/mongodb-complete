const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', done => {
    const joe = new User({ name: 'Joe' });

    joe.save().then(() => {
      // Assert that at this point in time joe is already saved to DB
      assert(!joe.isNew);
      done();
    });
  });
});
