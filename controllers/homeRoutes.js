const router = require('express').Router();
const { User, Blog_Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all blog posts and their associated users
router.get('/', async (req, res) => {
  try {
    const blog_posts = await Blog_Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['content', 'user_id', 'blog_post_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });
    const serialized_posts = blog_posts.map((post) =>
      post.get({ plain: true })
    );
    res.render('homepage', {
      serialized_posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

// Render signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Render profile page
router.get('/profile', withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Blog_Post,
          attributes: ['id', 'title', 'content', 'created_at'],
        },
      ],
    });
    const serialized_user = user.get({ plain: true });
    res.render('profile', {
      serialized_user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
