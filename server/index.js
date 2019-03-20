const express = require('express');
const expressWS = require('express-ws');
var cors = require('cors')

const { setup } = require('radiks-server');

const app = express();
const makeApiController = require('./ApiController');

//should be disabled online
app.use(cors())

setup().then((RadiksController) => {
  app.use('/radiks', RadiksController);
  app.use('/api', makeApiController(RadiksController.DB));

  expressWS(app);

var port = 1260;
  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

