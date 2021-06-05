// module.exports = (route) => {
//     route.get('/',(req, res) => {
//         res.json("hola");
//       })
//   };

const database = require('../../database');
const validateErrors = require('../../validations/validateErrors');


module.exports = (route) => {
  route.post(
    '/',
    
    validateErrors,
    (async (req, res) => {
      const title = req.body.title;
      const description = req.body.description;


      const newTask = await database.add({
        title,
        description,
      });

      res.json(newTask);
    })
  );
};
