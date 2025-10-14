export function validateTextInput(text: string, minLength: number = 1, fieldName: string = 'texto'): {
  isValid: boolean;
  error?: string;
} {
  if (!text || typeof text !== 'string') {
    return {
      isValid: false,
      error: `El ${fieldName} es requerido`,
    };
  }

  const trimmedText = text.trim();

  if (trimmedText.length === 0) {
    return {
      isValid: false,
      error: `El ${fieldName} no puede estar vacío`,
    };
  }

  if (trimmedText.length < minLength) {
    return {
      isValid: false,
      error: `El ${fieldName} debe tener al menos ${minLength} caracteres`,
    };
  }

  return { isValid: true };
}

/**
 * Validación de rango numérico.
 */
export function validateNumberRange(
  value: number,
  min: number,
  max: number,
  fieldName: string = 'valor'
): {
  isValid: boolean;
  error?: string;
} {
  if (typeof value !== 'number' || isNaN(value)) {
    return {
      isValid: false,
      error: `El ${fieldName} debe ser un número válido`,
    };
  }

  if (value < min || value > max) {
    return {
      isValid: false,
      error: `El ${fieldName} debe estar entre ${min} y ${max}`,
    };
  }

  return { isValid: true };
}

/**
 * Validación URL
 */
export function validateURL(url: string): {
  isValid: boolean;
  error?: string;
} {
  if (!url || typeof url !== 'string') {
    return {
      isValid: false,
      error: 'La URL es requerida',
    };
  }

  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return {
      isValid: false,
      error: 'La URL no tiene un formato válido',
    };
  }
}

/**
 * Cadena de texto segura.
 */
export function sanitizeText(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  // Eliminar caracteres potencialmente peligrosos
  return text
    .replace(/[\x00-\x1F\x7F-\x9F]/g, '')
}

/**
 * Validación de entrada para generación de artículos.
 */
export function validateArticleInput(inputType: string, inputValue: string): {
  isValid: boolean;
  error?: string;
} {
  // Validar tipo de entrada
  if (!inputType || (inputType !== 'topic' && inputType !== 'url')) {
    return {
      isValid: false,
      error: 'El tipo de entrada debe ser "topic" o "url"',
    };
  }

  // Validar valor de entrada
  if (inputType === 'url') {
    return validateURL(inputValue);
  } else {
    return validateTextInput(inputValue, 10, 'tema');
  }
}

/**
 * Validación de entrada para generación de títulos.
 */
export function validateTitleInput(articleText: string, count: number): {
  isValid: boolean;
  error?: string;
} {
  // Validar texto del artículo
  const textValidation = validateTextInput(articleText, 50, 'texto del artículo');
  if (!textValidation.isValid) {
    return textValidation;
  }

  // Validar cantidad de títulos
  return validateNumberRange(count, 1, 10, 'número de títulos');
}
