import { useProfile } from "../Hooks/useProfile";
import { useLogout } from "../Hooks/useLogout";
import { useState, useEffect } from "react";
import api from "../api/api";
import "./ProfilePage.css";

export default function ProfilePage() {
  const profile = useProfile();
  const logout = useLogout();

  const [cars, setCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (profile.data) {
      api
        .get("/cars/user")
        .then((res) => setCars(res.data))
        .catch(() => setError("Failed to load registered cars"))
        .finally(() => setLoadingCars(false));
    }
  }, [profile.data]);

  if (profile.isLoading) return <p className="loading">Loading profile...</p>;
  if (profile.isError) return <p className="error">Error loading profile</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Account</h2>

        <p><strong>Email:</strong> {profile.data.email}</p>
        <p><strong>ID:</strong> {profile.data.id}</p>

        <h3>Registered Cars</h3>
        {loadingCars && <p>Loading cars...</p>}
        {error && <p className="error">{error}</p>}
        {!loadingCars && cars.length === 0 && <p>No cars registered yet.</p>}

        <ul className="car-list">
          {cars.map((car) => (
            <li key={car.id}>
              {car.brand} {car.model} | Plate: {car.plateNumber} | Passport: {car.passportNumber} | Time: {car.time}
            </li>
          ))}
        </ul>

        <button className="logout-btn" onClick={() => logout.mutate()}>
          Logout
        </button>
      </div>
    </div>
  );
}
