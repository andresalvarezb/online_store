// import express
const express = require('express');
const routersApi = require('./routes');

const {logErrors, errorHandler, boomErrorHandler} = require('./middleware/error.handler');

const app = express();
// create port
const port = 8080;

app.use(express.json());
routersApi(app);

app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => console.log(`Run server http://localhost:${port}`));
