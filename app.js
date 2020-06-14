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
// curl -H "Authorization: Basic Y2QzM2EwMDI3NmE2NDVmMzkzNDQ1YzQzODExNWI5NTg6Yjk5ODhkYjc2ZDA3NDQ0MmFhODFhMzczMTJkMTJkMjk=" -d grant_type=client_credentials https://accounts.spotify.com/api/token

app.get('/albums', (req, res) => {
  console.log('test');
  access_token = 'BQAVV31vI5AtVc_VuiAS_sfAWSIPc251R_4FmxnY7G428rtgM2Po8xyG0fcU5zEOvpd6n48hBS4NRMPdt5Y';
  fetch("https://api.spotify.com/v1/tracks/6ku4gCfjdxmYpajNONAciN", { // Family Feud
    'headers': {
      'Authorization': 'Bearer ' + access_token
    }
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
