import axios from "axios";

const API_URL = "http://localhost:3001";

let store = {
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
};

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  if (store.accessToken) {
    config.headers.Authorization = `Bearer ${store.accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !original._retry &&
      store.refreshToken
    ) {
      original._retry = true;
      try {
        const r = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken: store.refreshToken,
        });
        const { accessToken } = r.data;
        store.accessToken = accessToken;
        localStorage.setItem("accessToken", accessToken);
        original.headers.Authorization = `Bearer ${accessToken}`;
        return api(original);
      } catch (e) {
        store.accessToken = null;
        store.refreshToken = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
    return Promise.reject(error);
  }
);

export function saveTokens({ accessToken, refreshToken }) {
  store.accessToken = accessToken;
  store.refreshToken = refreshToken;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

export function clearTokens() {
  store.accessToken = null;
  store.refreshToken = null;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

export default api;