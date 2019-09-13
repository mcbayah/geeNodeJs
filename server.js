var ee = require('@google/earthengine');
var privateKey = require('./privatekey.json'); // the eeNodeJsProject private key 

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  // Authenticate using a service account.
  ee.data.authenticateViaPrivateKey(privateKey, function(e){
    //initialise earth engine
    ee.initialize(null, null, function() {
      const image = ee.Image('srtm90_v4');
      image.getMap({min: 0, max: 1000}, ({mapid, token}) => {
        //send the mapid back to the client
        res
          .status(200)
          .send(mapid)
          .end();
      });
    });
  });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});