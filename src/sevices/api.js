import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

const normalizeLoginResponse = (data) => {
    if (!data) {
        return null;
    }

    if (data.data) {
        return normalizeLoginResponse(data.data);
    }

    return {
        token: data.token || data.accessToken || data.access_token || null,
        user: data.user || data.profile || data.dataUser || null,
        role: data.role || data.user?.role || null,
        message: data.message || null,
    };
};

export const loginUser = async ({ identifier, password, role }) => {
    const endpoints = [
        "/auth/login",
        "/login",
        "/api/auth/login",
        "/api/login",
    ];

    const payload = {
        identifier,
        username: identifier,
        email: identifier,
        phone: identifier,
        password,
        role: role?.toLowerCase?.() || role,
    };

    let lastError = null;

    for (const endpoint of endpoints) {
        try {
            const response = await api.post(endpoint, payload);
            const normalized = normalizeLoginResponse(response.data);

            if (normalized?.token) {
                return normalized;
            }

            if (response.data?.success === true || response.status === 200) {
                return normalized;
            }
        } catch (error) {
            lastError = error;
        }
    }

    throw lastError || new Error("Login gagal");
};

export default api;
