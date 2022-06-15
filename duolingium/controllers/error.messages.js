const errorMessages = {
    error1000: {error_code: 1000, error_message: "Empty username field."},
    error1001: {error_code: 1001, error_message: "Empty password field."},
    error1002: {error_code: 1002, error_message: "Empty firstname field."},
    error1003: {error_code: 1003, error_message: "Empty lastname field."},
    error1004: {error_code: 1004, error_message: "Empty email field."},
    error1010: {error_code: 1010, error_message: "Duplicate username."},
    error1011: {error_code: 1011, error_message: "Duplicate email."},
    error1012: {error_code: 1012, error_message: "User does not exist"},
    error1020: {error_code: 1020, error_message: "Cannot change username"},
    error1021: {error_code: 1021, error_message: "Unrecognized field(s)"},
    error4000: {error_code: 4000, error_message: "Database error"}
}

const errors = function(errorCode) {
    return errorMessages["error"+errorCode.toString()]
}

module.exports = errors;