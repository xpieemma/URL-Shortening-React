export const validateAPI = (API_URL) => {
  if (typeof API_URL !== 'string' || API_URL.trim() === '') {
    return false;
  }

  try {
    const parsed = new URL(API_URL);

    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return false;
    }

    const hostname = parsed.hostname;

    if (!hostname) return false;

   
    if (hostname.includes('..')) return false;

    if (hostname.startsWith('.') || hostname.endsWith('.')) return false;

    
    if (!hostname.includes('.')) return false;

    const labels = hostname.split('.');
    const labelRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
    for (const label of labels) {
      if (label.length === 0) return false;
      // Single-character labels are valid (e.g. 't.co'), but must be alphanumeric
      if (label.length === 1 && !/^[a-zA-Z0-9]$/.test(label)) return false;
      if (label.length > 1 && !labelRegex.test(label)) return false;
    }

   
    const tld = labels[labels.length - 1];
    if (!/^[a-zA-Z]{2,}$/.test(tld)) return false;

    if (labels.length < 2) return false;

    return true;
  } catch {
    return false;
  }
};

export const validateEmptyInput = (value) => {
  if (typeof value !== 'string') return false;
  return value.trim().length > 0;
};