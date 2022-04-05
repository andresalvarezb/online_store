const express = require('express');
const usersRouter = require('./users.router');
const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');

function routersApi(app) {
    // path global
    const router = express.Router();
    app.use('/api/v1', router);

    router.use('/products', productsRouter);
    router.use('/users', usersRouter);
    router.use('/categories', categoriesRouter);
}

module.exports = routersApi;
