const paymentResponseCodes = require('../contants/payment_resp_codes.js')

class PaymentError extends Error {
    constructor({ message, name, statusCode, data }) {
        super(message)
        this.message = message
        this.name = name
        this.status = statusCode
        this.data = data
    }
}


class PaymentNotFound extends PaymentError {
    constructor(message = 'Not Found', data) {
        super({
            message,
            name: PaymentNotFound.name,
            statusCode: paymentResponseCodes.NOT_FOUND,
            data
        });
    }
}
class PaymentRequestForbidden extends PaymentError {
    constructor(message = 'request forbidden', data) {
        super({
            message,
            name: PaymentForbidden.name,
            statusCode: paymentResponseCodes.FORBIDDEN,
            data
        });
    }
}
class PaymentBadRequest extends PaymentError {
    constructor(message = 'Bad Request', data) {
        super({
            message,
            name: PaymentBadRequest.name,
            statusCode: paymentResponseCodes.BAD_REQUEST,
            data
        });
    }
}

class PaymentInternalServerError extends PaymentError {
    constructor(message = 'Internal server error', data) {
        super({
            message,
            name: PaymentInternalServerError.name,
            statusCode: paymentResponseCodes.INTERNAL_SERVER_ERROR,
            data
        });
    }
}
class PaymentInvalidCredentials extends PaymentError {
    constructor(message = 'invalid credentials', data) {
        super({
            message,
            name: PaymentInvalidCredentials.name,
            statusCode: paymentResponseCodes.INVALID_CREDENTIALS,
            data
        });
    }
}
class PaymentManyRequests extends PaymentError {
    constructor(message = 'invalid credentials', data) {
        super({
            message,
            name: PaymentManyRequests.name,
            statusCode: paymentResponseCodes.TOO_MANY_REQUESTS,
            data
        });
    }
}

module.exports = {
    PaymentBadRequest,
    PaymentInvalidCredentials,
    PaymentInternalServerError,
    PaymentNotFound,
    PaymentManyRequests,
    PaymentRequestForbidden
}