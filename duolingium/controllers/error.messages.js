const errors = {
    error1000: {error_code: 1000, error_message: "Empty username field."},
    error1001: {error_code: 1001, error_message: "Empty password field."},
    error1002: {error_code: 1002, error_message: "Empty firstname field."},
    error1003: {error_code: 1003, error_message: "Empty lastname field."},
    error1004: {error_code: 1004, error_message: "Empty email field."},
    error1010: {error_code: 1010, error_message: "Username already in use."},
    error1011: {error_code: 1011, error_message: "Email already in use."},

    error1020: {error_code:1020, error_message: "Cannot change username"},

    error4000: {error_code: 4000, error_message: "Database error"}
}

module.exports = errors;