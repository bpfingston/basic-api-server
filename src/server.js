'use strict';

const express = require('express');
const foodRoute = require('./routes/food');
const restaurantRoute = require('./routes/restaurant');
const app = express();
const logger = require('./middleware/logger');
const e404 = require('./error-handlers/404');
const e500 = require('./error-handlers/500');

app.use(express.json());
app.use(logger);

app.use(restaurantRoute);
app.use(foodRoute);

app.use(e404);
app.use(e500);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => console.log('server listening on', port));
  },
};