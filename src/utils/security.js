// src/utils/security.js

/**
 * Removes dangerous characters from user input
 */
export const sanitizeInput = (input, maxLength = 255) => {
  if (typeof input !== 'string') return '';
  
  let cleaned = input.trim();
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