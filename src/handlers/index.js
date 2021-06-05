const express = require('express');
const taskRouting = require ('./tasks');

const apiRouting = express.Router();

apiRouting.use('/api', taskRouting);

module.exports = apiRouting;