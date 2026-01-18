import { useProfile } from "../Hooks/useProfile";
import { useLogout } from "../Hooks/useLogout";
import { useUserCars } from "../Hooks/useUserCars";
import "./ProfilePage.css";

export default function ProfilePage() {
  const profile = useProfile();
  const logout = useLogout();
  const userCars = useUserCars();

  if (profile.isLoading) return <p className="loading">Loading profile...</p>;
  if (profile.isError) return <p className="error">Error loading profile</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Account</h2>

        <p><strong>Email:</strong> {profile.data.email}</p>
        <p><strong>ID:</strong> {profile.data.id}</p>

        <h3>Registered Cars</h3>
        {userCars.isLoading && <p>Loading cars...</p>}
        {userCars.isError && <p className="error">Failed to load registered cars</p>}
        {userCars.data?.length === 0 && <p>No cars registered yet.</p>}

        <ul className="car-list">
          {userCars.data?.map((car) => (
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
