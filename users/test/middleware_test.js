const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let joe, blogPost;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({
      title: 'JS FTW',
      content:
        'Ipsum quae quos eaque assumenda quaerat odit nostrum aperiam tempora odit. Recusandae architecto fugiat eius laborum sit praesentium, ullam repudiandae. Explicabo voluptates porro dolor hic soluta. Accusantium distinctio quisquam cupiditate'
    });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  it('users clean up dangling blog posts on remove', done => {
    joe
      .remove()
      .then(() => BlogPost.count())
      .then(count => assert(count === 0))
      .then(done);
  });
});
