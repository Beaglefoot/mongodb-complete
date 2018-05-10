const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({
      title: 'JS FTW',
      content:
        'Ipsum quae quos eaque assumenda quaerat odit nostrum aperiam tempora odit. Recusandae architecto fugiat eius laborum sit praesentium, ullam repudiandae. Explicabo voluptates porro dolor hic soluta. Accusantium distinctio quisquam cupiditate'
    });
    comment = new Comment({ content: 'Nice post' });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it('saves a relation between a user and a blogpost', done => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then(user => assert(user.blogPosts[0].title === 'JS FTW'))
      .then(done);
  });

  it('saves a full relation graph', done => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then(user => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS FTW');
        assert(user.blogPosts[0].comments[0].content === 'Nice post');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
      })
      .then(done);
  });
});
