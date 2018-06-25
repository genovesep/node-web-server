const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs'); //express

// middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.originalUrl}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Sorry...',
//     message: 'This website is under maintenance! We\'ll be back soon.'
//   })
// });

app.use(express.static(__dirname + '/public')); //register a middleware express

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

// handler for http get request
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    message: 'Welcome to MyCustomServer'
  });
});

app.get('/about', (req, res) => {
  //res.send('About page!');
  res.render('about.hbs', {
    pageTitle: 'About Page',
    message: 'This is about me...'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Unable to proceed with this request'
  });
});
