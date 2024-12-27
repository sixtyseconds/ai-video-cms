import { UPLOAD_CONFIG } from '../config/upload';

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateFile(
  file: File, 
  allowedTypes: readonly string[], 
  maxSize: number
): ValidationResult {
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size must be under ${maxSize / (1024 * 1024)}MB`
    };
  }

  return { valid: true };
}

export function validateVideoFile(file: File): ValidationResult {
  return validateFile(
    file,
    UPLOAD_CONFIG.VIDEO.ALLOWED_TYPES,
    UPLOAD_CONFIG.VIDEO.MAX_SIZE
  );
}

export function validateImageFile(file: File): ValidationResult {
  return validateFile(
    file,
    UPLOAD_CONFIG.IMAGE.ALLOWED_TYPES,
    UPLOAD_CONFIG.IMAGE.MAX_SIZE
  );
}