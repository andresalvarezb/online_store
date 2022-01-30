// this show ur the error in console
function logErrors (err, req, res, next) {
    console.error(err);   // useful for tracking in errors
    next(err);  // middleware type error
}

// this send the error in a format to aur client

function errorHandler(err, req, res, next) {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
}

function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json( output.payload )
    }
    next(err)
}

module.exports = {logErrors, errorHandler, boomErrorHandler}
