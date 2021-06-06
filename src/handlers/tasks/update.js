const database = require('../../database');
const validateTitle = require('../../validations/tasks/validateTitle');
const validateErrors = require('../../validations/validateErrors');


/**
 * PUT /api/tasks/:taskId
 *
 * title: obligatorio
 */
 module.exports = (route) => {
    route.put(
      '/:taskId',
      validateTitle,
      validateErrors,
      async (req, res) => {
        const taskId = parseInt(req.params.taskId);
        const title = req.body.title;
        const description = req.body.description;
        const state = req.body.state;
  
        const task = await database.update(taskId, {
            title,
            description,
            state,
        });
  
        res.json(task);
      }
    );
  };