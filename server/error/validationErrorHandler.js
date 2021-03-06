const ApiError = require('../error/ApiError')

module.exports = function(errors)  {
    let validationErrorArray = []
    errors.errors.map(error => validationErrorArray.push(error.msg))
    const validationError = validationErrorArray.join('. ')
    throw ApiError.unprocessableEntity(validationError);
}
