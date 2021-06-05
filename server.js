const express = require('express');
const { PORT } = require('./src/config');
const { initDB } = require('./src/database');

const app = express();

app.use(express.static('./public'));


(async () => {
    await initDB();
    app.listen(PORT, () => {
      console.info(`Oyendo en puerto ${PORT}`);
    });
  })();