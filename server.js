const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const server = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://jsmn:jsmn1234@cluster0.qsd2aww.mongodb.net/blog-express-app?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => server.listen(port = process.env.PORT || 3000))
  .catch(err => console.log(err));

// register view engine
server.set('view engine', 'ejs');

// middleware & static fileserver.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
server.get('/', (req, res) => {
  res.redirect('/blogs');
});

server.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
server.use('/blogs', blogRoutes);

// 404 page
server.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});