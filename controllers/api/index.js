const router = require('express').Router();

const userRoutes = require('./userRoutes');
const blog_postRoutes = require('./blog_postRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/blog_posts', blog_postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;