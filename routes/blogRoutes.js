
const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

//index, main page
router.get('/blogs', blogController.blog_index); 
// create a new post
router.post('/blogs', blogController.blog_create_post);
//create a new post
router.get('/blogs/create', blogController.blog_create_get);
//details of a post
router.get('/blogs/:id', blogController.blog_details);
//delete a post
router.delete('/blogs/:id', blogController.blog_delete);
  
module.exports = router;