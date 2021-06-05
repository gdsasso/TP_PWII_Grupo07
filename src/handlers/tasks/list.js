const database = require('../../database');
const requestHandler = require('../../middlewares/requestHandler');

// GET /api/users
module.exports = (route) => {
  route.get(
    '/',
    requestHandler(async (req, res) => {
      const tasks = await database.list(req.query.filterTasks);
      res.json(tasks);
    })
  );
};