const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  mongoose = require('mongoose');

const port = 3080;

// Connection to DB
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import controller
const chemicalsCtrl = require('./controllers/chemicals.js');

//API router
const chemicalRoute = express.Router();

chemicalRoute.route('/allChemicals').get(chemicalsCtrl.findAllChemicals);
chemicalRoute.route('/chemicals').get(chemicalsCtrl.findChemicals);

app.use('/api', chemicalRoute);

// Import controller
const oauthCtrl = require('./controllers/oauth.js');

//Login router
var oauthRouter = express.Router();

oauthRouter.route('/redirect').get(oauthCtrl.oauth);

app.use('/oauth', oauthRouter);

// Start server
app.listen(port, function () {
  console.log('Node server running on http://localhost:3080');
});
