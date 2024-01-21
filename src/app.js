const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.json({
    limit: '100mb',
    extended: true,
}))

app.use('/', routes);

module.exports = app;