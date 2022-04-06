// import express
const express = require('express');
const routersApi = require('./routes');
const cors = require('cors')

const { logErrors, errorHandler, boomErrorHandler } = require('./middleware/error.handler');

const app = express();
// create port
const port = 8080;

const whiteList = ['http://localhost:8080', 'https://myapp.com']
const options = {
	origin: (origin, callback) => {
		if (whiteList.includes(origin)) {
			callback(null, true)
		} else {
			callback(new Error('don\'t allow'))
		}
	}
}
app.use(express.json());
app.use(cors(options))

routersApi(app);

app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => console.log(`Run server http://localhost:${port}`));
