// src/js/config.js
export const CONFIG = {
    APP_NAME: 'Bozorcha',
    APP_VERSION: '1.0.0',
    DEFAULT_LANGUAGE: 'tg',
    SUPPORTED_LANGUAGES: ['tg', 'ru', 'en'],
    
    // Рангҳои асосӣ
    COLORS: {
        primary: '#007bff',
        success: '#28a745',
        danger: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    },
    
    // Маҳдудиятҳо
    LIMITS: {
        maxProductsPerPage: 20,
        maxPhotosPerProduct: 5,
        maxVariantsPerProduct: 10
    },
    
    // API Endpoints (Edge Functions)
    API: {
        searchProducts: '/functions/v1/search-products',
        createOrder: '/functions/v1/create-order',
        getProfile: '/functions/v1/get-profile',
        paymentWebhook: '/functions/v1/payment-webhook'
    }
}

// Функсия барои гирифтани номи барнома
export const getAppName = () => CONFIG.APP_NAME
