const express = require('express');
const { PORT } = require('./src/config');

const app = express();

app.use(express.static('./public'));





app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});