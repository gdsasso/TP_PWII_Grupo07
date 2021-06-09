const database = require('../../database');
const validateTitle = require("../../validations/tasks/validateTitle");
const validateErrors = require('../../validations/validateErrors');
const requestHandler = require('../../middlewares/requestHandler');

module.exports = (route) => {
  route.post(
    '/',
    validateTitle,
    validateErrors,
    requestHandler(async (req, res) => {
      const title = req.body.title;
      const description = req.body.description;
      const idUsers = req.body.idusers;
      
      const newTask = await database.add({
        idUsers, 
        title,
        description,               
      });
     
      res.json(newTask);
    })
  );
};
