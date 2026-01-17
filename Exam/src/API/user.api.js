import api from "./api";

export async function fetchProfile() {
  const res = await api.get("/users/profile");
  return res.data;
}

export async function fetchUserCars() {
  const res = await api.get("/cars/user");
  return res.data;
}