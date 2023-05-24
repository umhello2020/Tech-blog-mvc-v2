const User = require('./user');
const Comment = require('./comment');
const Blog_Post = require('./blog_post');

Blog_Post.hasMany(Comment, {
    foreignKey: 'blog_post_id',
});

Blog_Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'blog_post_id'
});

Comment.belongsTo(Blog_Post, {
    foreignKey: 'blog_post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

User.hasMany(Blog_Post, {
    foreignKey: 'user_id'
});

module.exports = { User, Comment, Blog_Post };