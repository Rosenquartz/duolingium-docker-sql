const errorMessages = {
    error1000: {error_code: 1000, error_message: "Empty username field."},
    error1001: {error_code: 1001, error_message: "Empty password field."},
    error1002: {error_code: 1002, error_message: "Empty firstname field."},
    error1003: {error_code: 1003, error_message: "Empty lastname field."},
    error1004: {error_code: 1004, error_message: "Empty email field."},
    error1005: {error_code: 1005, error_message: "Invalid email format."},
    error1010: {error_code: 1010, error_message: "Duplicate username."},
    error1011: {error_code: 1011, error_message: "Duplicate email."},
    error1012: {error_code: 1012, error_message: "User does not exist"},
    error1020: {error_code: 1020, error_message: "Cannot change username"},
    error1021: {error_code: 1021, error_message: "Unrecognized field(s)"},
    error1030: {error_code: 1030, error_message: "Error: both 'english' and 'native' fields are set."},
    error1031: {error_code: 1031, error_message: "Error: neither 'english' nor 'native' fields are set."},
    error1032: {error_code: 1032, error_message: "No language specified."},
    error1033: {error_code: 1033, error_message: "Error: cannot have both new and review parameters."},
    error1034: {error_code: 1034, error_message: "Module ID has to be specified in request query parameters."},
    error1035: {error_code: 1035, error_message: "Language does not exist."},
    error1036: {error_code: 1036, error_message: "Module does not exist."},
    error4000: {error_code: 4000, error_message: "Database error"}
}

const errors = function(errorCode) {
    return errorMessages["error"+errorCode.toString()]
}

module.exports = errors;