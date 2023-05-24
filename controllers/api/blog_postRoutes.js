const router = require('express').Router();
const { Blog_Post } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Blog_Post.create({
      ...req.body,
      user_id: req.session.user_id
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE existing blog post by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Blog_Post.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updatedPost) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE existing blog post by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedPost = await Blog_Post.destroy({
      where: { id: req.params.id }
    });

    if (!deletedPost) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
