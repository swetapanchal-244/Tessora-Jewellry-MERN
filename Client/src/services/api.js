import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// har request ke saath token bhejo (agar login hai)
api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem("tessora_user") || "null");
    if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
    return config;
});

export default api;