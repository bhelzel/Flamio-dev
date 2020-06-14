const express = require('express');
const app = express();
// const http = require('http').Server(app)
const path = require('path');
const fetch = require('node-fetch');
const PORT = 8000;

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/song', (req, res) => {
  fetch('')
    .then(res => {
      return res.json();
    }).then(data => {
      console.log(data);
      // response.send(data);
    }).catch(error => {
      console.log(error);
    });

});

app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`);
});
