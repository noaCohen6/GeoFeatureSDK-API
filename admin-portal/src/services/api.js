import axios from 'axios';

// 🔥 ה-URL יילקח מקובץ ה-.env
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ============ FEATURES API ============

/**
 * קבלת כל ה-Features
 */
export const getAllFeatures = async () => {
    const response = await api.get('/features');
    return response.data;
};

/**
 * קבלת Feature לפי ID
 */
export const getFeatureById = async (id) => {
    const response = await api.get(`/features/${id}`);
    return response.data;
};

/**
 * יצירת Feature חדש
 */
export const createFeature = async (featureData) => {
    const response = await api.post('/features', featureData);
    return response.data;
};

/**
 * עדכון Feature קיים
 */
export const updateFeature = async (id, featureData) => {
    const response = await api.put(`/features/${id}`, featureData);
    return response.data;
};

/**
 * מחיקת Feature
 */
export const deleteFeature = async (id) => {
    await api.delete(`/features/${id}`);
};

/**
 * שאילתת Feature עם קוד מדינה
 */
export const queryFeature = async (featureName, countryCode) => {
    const response = await api.post('/features/query', {
        featureName,
        countryCode,
    });
    return response.data;
};

export default api;