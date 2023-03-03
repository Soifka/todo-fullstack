const { Error: { ValidationError, CastError } } = require('mongoose');
const NotFoundError = require('./errors/NotFound');

module.exports.errorHandler = async(err, req, res, next) => {
    if(err instanceof ValidationError) {
        return res.status(400).send({err: err.message});
    }
    if(err instanceof CastError) {
        return res.status(400).send('Invalid id');
    }
    if(err instanceof NotFoundError) {
        return res.status(400).send({err: err.message});
    }
    console.log(err.stack);
    return res.status(500).send('Unknown error');
}