const { PaymentBadRequest, PaymentNotFound, PaymentInternalServerError, PaymentInvalidCredentials, PaymentRequestForbidden } = require("./paymentExceptions")

module.exports = function handlePaymentExceptions(error) {
    if (error.status == 400) throw new PaymentBadRequest('bad request', error)
    if (error.status == 404) throw new PaymentNotFound('not found', error)
    if (error.status == 500) throw new PaymentInternalServerError('internal server error', error)
    if (error.status == 401) throw new PaymentInvalidCredentials('invalid credentials', error)
    if (error.status == 429) throw new PaymentTo('bad request', error)
    if (error.status == 403) throw new PaymentRequestForbidden('payment request forbidden', error)
}