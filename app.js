const express = require('express');
const app = express();
// const http = require('http').Server(app)
const path = require('path');
const fetch = require('node-fetch');
const PORT = 8000;

app.use(express.static('public'));


app.get('/', (req, res) => {
  console.log('test');
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// app.get('/auth', (req, res) => {
//   fetch('')
// });

// access cmd 
// curl -X s https://accounts.spotify.com/api/tokenMDI3NmE2NDVmMzkzNDQ1YzQzODExNWI5NTg6Yjk5ODhkYjc2ZDA3NDQ0MmFhODFhMzczMTJkMTJkMjk=" -d grant_type=client_credentials

app.get('/albums', (req, res) => {
  console.log('test');
  fetch("https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=10/")
    .then(res => {
      return res.json();
    }).then(data => {
      console.log(data);
      res.send(data);
    }).catch(error => {
      console.log(error);
    });

});

app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`);
});
