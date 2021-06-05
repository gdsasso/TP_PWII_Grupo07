const express = require('express');
const { PORT } = require('./src/config');
const routingAPI = require('./src/handlers');
const { initDB } = require('./src/database');

const app = express();

app.use(express.json());

app.use(routingAPI);
app.use(express.static('./public'));


(async () => {
    await initDB();
    app.listen(PORT, () => {
      console.info(`Oyendo en puerto ${PORT}`);
    });
  })();