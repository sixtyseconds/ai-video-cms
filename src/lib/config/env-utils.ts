// Get environment variable with Vite prefix handling
export function getEnvVar(key: string): string {
  // First try with VITE_ prefix
  const viteKey = `VITE_${key}`;
  let value = import.meta.env[viteKey];
  
  // If not found, try without prefix
  if (!value) {
    value = import.meta.env[key];
  }
  
  // If still not found, try process.env (for Node.js environments)
  if (typeof value === 'undefined' && typeof process !== 'undefined') {
    value = process.env[key];
  }

  return value || '';
}

export function validateEnvVars(requiredVars: string[]): void {
  const missing = requiredVars.filter(key => {
    const value = getEnvVar(key);
    return !value || value.length === 0;
  });

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}