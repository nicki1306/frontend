export const getBaseUrl = () => {
    const isProduction = import.meta.env.MODE === 'production';
    if (isProduction) {
        return 'https://backend-production-55b2.up.railway.app';
    } else {
        return 'http://localhost:8081';
    }
};