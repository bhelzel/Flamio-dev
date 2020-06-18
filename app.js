// const getQueryVariable = require('./public/javascripts/url_util').getQueryVariable;

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

const my_client_id = 'a64234f56f8e450388a65942b974fd6a';
const redirect_uri = 'http://localhost:8000/albums';
const base_encoded = "YTY0MjM0ZjU2ZjhlNDUwMzg4YTY1OTQyYjk3NGZkNmE6OThlMTZhYWVkNmJlNDRkMjlmNTEyOTk4OGJkZTYzZWU=";

// access cmd 
// curl -H "Authorization: Basic YTY0MjM0ZjU2ZjhlNDUwMzg4YTY1OTQyYjk3NGZkNmE6OThlMTZhYWVkNmJlNDRkMjlmNTEyOTk4OGJkZTYzZWU=" -d grant_type=client_credentials https://accounts.spotify.com/api/token

app.get('/login', (req, res) => {

  const scopes = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + my_client_id +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri)); // .then(res => console.log('AUTH RESPONSE: ', res));
});

app.get('/albums', (req, res) => {
  console.log('in the access');
  const code = req.query.code;
  console.log(code);
  // exchange code for access token
  fetch("https://accounts.spotify.com/api/token", {
    'method': 'POST',
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': 'http://localhost:8000/albums',
    'headers': {
      'Authorization': 'Basic ' + base_encoded
    }
  }).then(res => {
    console.log('result of getting access token: ', res);
    access_token = res.access_token ? res.access_token : '' // 'BQAZw_D8s_p91UBIFTwwc6FMWUy_04Vlw2NOhPnG_0Ax9lW9RC522mxuRJ2Zw5cifd1TiQqn3XEcOxTqoIw';
    return fetch("https://api.spotify.com/v1/tracks/6ku4gCfjdxmYpajNONAciN", { // Family Feud
      'headers': {
        'Authorization': 'Bearer ' + access_token
      }
    });
  })
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
