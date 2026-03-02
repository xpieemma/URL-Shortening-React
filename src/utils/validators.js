export const validateAPI = (API_URL) => {

    try {
new URL(API_URL);
return true;
    } catch(_) {
        return false;
    }
};

export const validateEmptyInput = (value) => {
    return value && value.trim().length > 0;
};