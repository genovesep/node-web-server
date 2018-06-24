const express = require('express');

var app = express();
app.listen(3000);

// handler for http get request
app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  res.send({
    name:'Piero',
    likes: [
      'running',
      'dancing'
    ]
  });
});

app.get('/about', (req, res) => {
  res.send('About page!');
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Unable to proceed with this request'
  });
});
