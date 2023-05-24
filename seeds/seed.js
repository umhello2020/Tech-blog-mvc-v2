const sequelize = require('../config/connection');
const { User, Blog_Post, Comment } = require('../models');

const userData = require('./userData.json');
const blogPostData = require('./blog_postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    const blogPosts = await Blog_Post.bulkCreate(blogPostData);

    const newBlogPost = {
      title: 'My New Blog Post',
      content: 'Lorem ipsum dolor sit amet...',
      user_id: users[Math.floor(Math.random() * users.length)].id
    };

    const createdBlogPost = await Blog_Post.create(newBlogPost);

    for (const comment of commentData) {
      await Comment.create({
        ...comment,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        blog_post_id: createdBlogPost.id,
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
