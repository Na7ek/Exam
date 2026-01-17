import api, { saveTokens, clearTokens } from "./api";

export async function loginRequest({ username, password }) {
  const res = await api.post("/users/login", { username, password });
  const { accessToken, refreshToken, user } = res.data;
  saveTokens({ accessToken, refreshToken });
  return user;
}

export async function registerRequest({ username, email, password }) {
  const res = await api.post("/users/register", { username, email, password });
  const { accessToken, refreshToken, user } = res.data;
  saveTokens({ accessToken, refreshToken });
  return user;
}

export async function logoutRequest() {
  const refresh = localStorage.getItem("refreshToken");
  if (refresh) await api.post("/users/logout", { refreshToken: refresh });
  clearTokens();
}