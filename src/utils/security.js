// src/utils/security.js

/**
 * Removes dangerous characters from user input
 * @param {string} input - The input to sanitize
 * @param {number} maxLength - Maximum length allowed
 * @param {boolean} preserveNewlines - Whether to preserve newline characters (for textareas)
 */
export const sanitizeInput = (input, maxLength = 255, preserveNewlines = false) => {
  if (typeof input !== 'string') return '';
  
  let cleaned = input;
  
  // Only trim if not preserving newlines (for regular inputs)
  if (!preserveNewlines) {
    cleaned = cleaned.trim();
  }
  
  // Remove dangerous HTML tags and scripts
  cleaned = cleaned.replace(/[<>]/g, '');
  cleaned = cleaned.replace(/javascript:/gi, '');
  cleaned = cleaned.replace(/on\w+=/gi, '');
  
  return cleaned.substring(0, maxLength);
};

/**
 * Validation patterns for different input types
 */
export const PATTERNS = {
  POP_CODE: /^[A-Z]{4}$/,
  DEVICE_NAME: /^[a-zA-Z0-9.\-_]+$/,
  SERIAL_NUMBER: /^[a-zA-Z0-9]+$/,
  ADDRESS: /^[a-zA-Z0-9\s\-.,#]+$/,
};

/**
 * Check if input matches a pattern
 */
export const validatePattern = (input, pattern) => {
  if (!input) return true;
  return pattern.test(input);
};