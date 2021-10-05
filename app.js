const express = require('express');
const morgan = require('morgan'); //for middleware
const mongoose = require('mongoose'); //data base
const  blogRoutes = require('./routes/blogRoutes');

// Import global environment variables
require('dotenv').config({
  path : 'variables.env'
})

// express app
const app = express();

// Read localhost from variables and port
// Heroku will detect that 0.0.0.0 is not valid and will assign a correct one automatically
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

// connect to MongoDB
const dbURI = process.env.DB_URL;
mongoose.connect(dbURI, { useNewUrlParser : true, useUnifiedTopology : true })
//listen for requests
  .then((result) => app.listen(port, host, () => {
    console.log('running');
  }))
  .catch((err) => console.log(err))

//register view engine
//app.set('views', './views/');
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public')); //any file inside 'public' will be public xD
app.use(express.urlencoded({ extended : true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
res.render('about', { title: 'About' });
});

//blog routes
app.use(blogRoutes)

//404 page
// default case, This function is executed if none of the above functions worked
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
})