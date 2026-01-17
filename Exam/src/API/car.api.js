import api from "../api/api";

export async function getAvailableHours() {
  const res = await api.get("/bookings/hours");
  return res.data;
}

export async function registerCar({ owner, plate, model, brand, passportNum, date, hour }) {
  const res = await api.post("/bookings", { owner, plate, model, brand, passportNum, date, hour });
  return res.data;
}