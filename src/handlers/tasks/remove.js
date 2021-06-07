const database = require('../../database');

// DELETE /api/users/:userId
module.exports = (route) => {
  route.delete('/:taskId', async (req, res) => {
    const taskId = parseInt(req.params.taskId);

    await database.remove(taskId);

    res.json({
      message: 'Task deleted!',
    });
  });
};
