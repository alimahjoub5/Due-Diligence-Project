import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Update this based on your env or use Vite proxy
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor/response interceptor can be added here
// e.g. for handling tokens if auth is implemented

export const serviceAPI = {
    getAll: () => api.get('/services'),
    create: (data) => api.post('/services', data),
    update: (id, data) => api.put(`/services/${id}`, data),
    delete: (id) => api.delete(`/services/${id}`),
};

export const faqAPI = {
    getAll: () => api.get('/faqs'),
    create: (data) => api.post('/faqs', data),
    update: (id, data) => api.put(`/faqs/${id}`, data),
    delete: (id) => api.delete(`/faqs/${id}`),
};

export const testimonialAPI = {
    getAll: () => api.get('/testimonials'),
    create: (data) => api.post('/testimonials', data),
    update: (id, data) => api.put(`/testimonials/${id}`, data),
    delete: (id) => api.delete(`/testimonials/${id}`),
};

export const settingAPI = {
    get: async () => {
        // Try API first
        try {
            return await api.get('/settings');
        } catch (error) {
            // Fallback to localStorage
            console.warn("API failed, using localStorage for settings");
            const savedSettings = localStorage.getItem('siteSettings');
            return { data: savedSettings ? JSON.parse(savedSettings) : { maintenanceMode: false } };
        }
    },
    update: async (data) => {
        try {
            await api.put('/settings', data);
        } catch (error) {
            console.warn("API failed, saving settings to localStorage");
            localStorage.setItem('siteSettings', JSON.stringify(data));
        }
        return { data };
    },
};

export const contactAPI = {
    getAll: () => api.get('/contact-submissions'),
    delete: (id) => api.delete(`/contact-submissions/${id}`),
    update: (id, data) => api.put(`/contact-submissions/${id}`, data)
};

export const blogAPI = {
    getAll: () => api.get('/blogs'),
    getOne: (idOrSlug) => api.get(`/blogs/${idOrSlug}`),
    create: (data) => api.post('/blogs', data),
    update: (id, data) => api.put(`/blogs/${id}`, data),
    delete: (id) => api.delete(`/blogs/${id}`)
};

export const logsAPI = {
    getAll: () => api.get('/audit-logs')
};

export default api;
