import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CarRegistration.css";

export default function CarRegistration() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state || {};

  const [owner, setOwner] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [plate, setPlate] = useState("");
  const [passportNum, setPassportNum] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login", { state: { from: "/car-registration", booking } });
      return;
    }
  
    try {
      await api.post(
        "/bookings", 
        {
          date: booking.date,
          hour: booking.hour,
          model,
          brand,
          plate,
          passportNum,
          ownerName
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      );
  
      alert("Car registered and hour booked successfully!");
      navigate("/profile");
  
    } catch (err) {
      console.error(err);
      alert("Failed to register car. The hour may have been taken.");
    }
  };  

  return (
    <div className="car-registration-container">
      <h2>Car Registration</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date</label>
          <input type="text" value={booking.date || ""} readOnly />
        </div>

        <div className="form-group">
          <label>Hour</label>
          <input type="text" value={booking.hour || ""} readOnly />
        </div>

        <div className="form-group">
          <label>Owner's Full Name</label>
          <input
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Car Model</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Brand</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Plate Number</label>
          <input
            type="text"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Passport Number</label>
          <input
            type="text"
            value={passportNum}
            onChange={(e) => setPassportNum(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn primary">Confirm Registration</button>
      </form>
    </div>
  );
}
