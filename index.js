// import express
const express = require('express');
const routersApi = require('./routes');

const app = express();
// create port
const port = 8080;

app.use(express.json());
routersApi(app);

app.listen(port, () => console.log(`Run server http://localhost:${port}`));
