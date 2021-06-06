const database = require('../../database');

// GET /api/tasks/:taskId
module.exports = (route) => {
  route.get('/:taskId', async (req, res) => {
    const taskId = parseInt(req.params.taskId);
    const task = await database.find(taskId);

    if (task) {
      res.json(task);
    } else {
      res.status(404).json({
          status: "Tarea no encontrada",
      });
    }
  });
};
