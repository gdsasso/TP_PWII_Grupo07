const express = require('express');
const add = require('./add');
// const update = require('./update');
// const show = require('./show');
// const remove = require('./remove');
// const list = require('./list');

const taskRouting = express.Router();
add(taskRouting);
// show(taskRouting);
// remove(taskRouting);
// list(taskRouting);
// update(taskRouting);

const usersAPI = express.Router();
usersAPI.use('/task', taskRouting);

module.exports = usersAPI;
