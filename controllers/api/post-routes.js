const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// CREATE a post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET and render all posts
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ]
    });

    const posts = postData.map((post) => post.get({ plain: true }));
   
    res.render('all-posts', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET and render a single post
router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ]
    });

    const post = postData.get({ plain: true });

    res.render('single-post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT a review (update)
router.put('/:id', withAuth, async (req, res) => {
  try{
    const postData = await Post.update(
      req.body,
      { where: { id: req.params.id } }
    );

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(`Post ${req.params.id} has been updated`);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a review
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: { id: req.params.id }
    });
    if (!postData) {
      res.status(404).json({ message: 'No posts with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;