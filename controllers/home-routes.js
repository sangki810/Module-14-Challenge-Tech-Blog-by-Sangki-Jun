const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

// get all posts for homepage
router.get('/', async (req, res) => {
    // post findAll

    // map through the data, serialize it

    // render appropriate view, sending it the data it needs (which would the the posts)
});

router.get('/post/:id', async (req, res) => {
    // find a Post by Pk

    // serialize the data

    // render appropriate view, sending it the data it needs (which would be the psot)
});

router.get('/login', (req, res) => {
    // activity 18, home-routes.js
});

router.get('/signup', (req, res) => {
    // activity 18, home-routes.js
});

module.exports = router;