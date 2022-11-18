const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// CREATE a post
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET and render all posts
router.get('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ]
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));
   
    res.render('all-posts', {
      comments,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET and render a single post
router.get('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ]
    });

    const comment = commentData.get({ plain: true });

    res.render('single-post', {
      ...comment,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT a review (update)
router.put('/:id', withAuth, async (req, res) => {
  try{
    const commentData = await Comment.update(
      req.body,
      { where: { id: req.params.id } }
    );

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(`Comment ${req.params.id} has been updated`);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a review
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: { id: req.params.id }
    });
    if (!commentData) {
      res.status(404).json({ message: 'No comment with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;