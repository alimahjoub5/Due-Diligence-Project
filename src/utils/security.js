import DOMPurify from 'dompurify';

/**
 * Sanitizes input string to prevent XSS.
 * @param {string} input - The raw input string.
 * @returns {string} - The sanitized string.
 */
export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    return DOMPurify.sanitize(input.trim());
};

/**
 * Validates email format.
 * @param {string} email 
 * @returns {boolean}
 */
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

/**
 * Validates password strength (min 6 chars for now).
 * @param {string} password 
 * @returns {boolean}
 */
export const validatePassword = (password) => {
    return password && password.length >= 6;
};
