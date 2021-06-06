const express = require('express');
const add = require('./add');
const list = require('./list');
const update = require('./update');
// const show = require('./show');
// const remove = require('./remove');


const taskRouting = express.Router();
add(taskRouting);
list(taskRouting);
// show(taskRouting);
// remove(taskRouting);
update(taskRouting);

const usersAPI = express.Router();
usersAPI.use('/task', taskRouting);

module.exports = usersAPI;
