// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find() //asincrono
    .then((result) => {
        res.render('index', { title : 'All Blogs', blogs : result })
    })
    .catch((err) => {
        console.log(err);
    })
}

const blog_details = (req, res) => {
    //to avoid undefined, we use middleware: router.use(express.urlencoded({ extended : true }));
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => {
        res.render('details', { blog : result, title : 'Blog Details' });
    })
    .catch((err) => {
        console.log(err);
    })
}

const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create a new blog' });
}

const blog_create_post = (req, res) => {
    //to avoid undefined, we use middleware: router.use(express.urlencoded({ extended : true }));
    const blog = new Blog(req.body);
    blog.save()
    .then((result) => {
        res.redirect('/blogs');
    })
    .catch((err) => {
        console.log(err);
    })
}

const blog_delete = (req, res) => {
    //to avoid undefined, we use middleware: app.use(express.urlencoded({ extended : true }));
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({ redirect : '/blogs'});
    })
    .catch((err) => {
        console.log(err);
    })
}

module.exports = { 
    blog_index : blog_index,
    blog_details : blog_details,
    blog_create_get : blog_create_get,
    blog_create_post : blog_create_post,
    blog_delete : blog_delete
}