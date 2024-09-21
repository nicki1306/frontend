export const getBaseUrl = () => {
    const isProduction = import.meta.env.MODE === 'production';
    if (isProduction) {
        return import.meta.env.VITE_API_URL_PROD;
    } else {
        return import.meta.env.VITE_API_URL_DEV;
    }
};