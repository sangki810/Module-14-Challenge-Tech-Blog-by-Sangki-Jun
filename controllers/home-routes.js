const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const withAuth = require('../utils/auth');

// get all posts for homepage
router.get('/', async (req, res) => {
    // post findAll
    try {
        // Get all posts and JOIN with user data
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
            ],
        });

        // map through the data, serialize it
        const posts = postData.map((post) => post.get({ plain: true }));

        // render appropriate view, sending it the data it needs (which would the the posts)
        res.render('all-posts', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    // find a Post by Pk
    try {
        const postData = await Post.findByPk(req.params.id, {
          include: [
                {
                    model: User,
                    attributes: ['username'],
                },
          ],
        });

        // serialize the data
        const post = postData.get({ plain: true });

    // render appropriate view, sending it the data it needs (which would be the psot)
        res.render('single-post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // activity 18, home-routes.js
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login')
});

router.get('/signup', (req, res) => {
    // activity 18, home-routes.js
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;