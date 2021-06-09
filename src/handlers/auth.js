const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const database = require('../database');
const requestHandler = require('../middlewares/requestHandler');

const authRouting = express.Router();

/*
POSTMAN TEST SCRIPT
pm.test("Save login token", function () {
    var jsonData = pm.response.json();
    pm.collectionVariables.set("token", jsonData.accessToken);
});
*/

authRouting.post(
  '/login',
  requestHandler(async (req, res) => {
    const { username, password } = req.body;

    // Obtenemos el usuario buscando por USUARIO Y CONTRASEÑA
    const user = (
      await database.search({
        username,
        password,
      })
    ).pop();

    if (user) {
      // Usuario válido
      const accessToken = jwt.sign(
        {
          username,
          id: user.idusers,
        },
        JWT_SECRET,
        {
          expiresIn: '30m',
        }
      );

      res.json({
        status: 'success',
        accessToken,
        username:user.username,
        idUser:user.idusers,
      });
    } else {
      // Usuario inválido
      res.status(401).json({
        status: 'error',
        error: 'Usuario o contraseña incorrecto',
      });
    }
  })
);

module.exports = authRouting;