import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./SchedulePage.css";

export default function SchedulePage() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split("T")[0]);
  const [bookedHours, setBookedHours] = useState([]);
  const navigate = useNavigate();

  const hours = [];
  for (let h = 9; h <= 18; h++) {
    hours.push(`${h.toString().padStart(2, "0")}:00`);
    if (h !== 18) hours.push(`${h.toString().padStart(2, "0")}:30`);
  }

  const next7Days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    next7Days.push(d.toISOString().split("T")[0]);
  }

  const nowHour = today.getHours();
  const nowMinute = today.getMinutes();

  const isHourDisabled = (hour) => {
    if (selectedDate === today.toISOString().split("T")[0]) {
      const [h, m] = hour.split(":").map(Number);
      if (h < nowHour || (h === nowHour && m <= nowMinute)) return true;
    }
    return bookedHours.includes(hour);
  };

  useEffect(() => {
    const fetchBookedHours = async () => {
      try {
        const res = await api.get(`/bookings?date=${selectedDate}`);
        setBookedHours(res.data.map((b) => b.hour));
      } catch (err) {
        console.error(err);
        setBookedHours([]);
      }
    };
    fetchBookedHours();
  }, [selectedDate]);

  const handleHourClick = (hour) => {
    navigate("/car-registration", { state: { date: selectedDate, hour } });
  };

  return (
    <div className="schedule-container">
      <h2>Book Your Inspection</h2>

      <div className="date-picker">
        <label htmlFor="date">Select Date:</label>
        <select
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          {next7Days.map((date) => (
            <option key={date} value={date}>
              {new Date(date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </option>
          ))}
        </select>
      </div>

      <div className="hours-grid">
        {hours.map((hour) => (
          <button
            key={hour}
            className="hour-btn"
            onClick={() => handleHourClick(hour)}
            disabled={isHourDisabled(hour)}
          >
            {hour} {bookedHours.includes(hour) && "(Booked)"}
          </button>
        ))}
      </div>
    </div>
  );
}
