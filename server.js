const express = require('express');
const { PORT } = require('./src/config');

const app = express();

app.get("/", (req, res) => {
    res.send("El server funciona!!")
});

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});