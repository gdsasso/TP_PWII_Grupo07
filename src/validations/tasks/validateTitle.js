const { body } = require('express-validator');

module.exports = body('title')
  .notEmpty()
  .withMessage('El título es obligatorio');