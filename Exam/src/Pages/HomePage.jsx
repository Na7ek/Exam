import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home">
      <section className="hero">
        <h1>NK/MK Technical Inspection</h1>
        <p>
          Book your car inspection in minutes. Clear schedule. No chaos.
        </p>

        <div className="hero-actions">
          <Link to="/schedule" className="btn primary">
            Book an Inspection
          </Link>
          <Link to="/register" className="btn secondary">
            Create Account
          </Link>
        </div>
      </section>

      <section className="info">
        <div className="card">
          <h3>Fast</h3>
          <p>No queues, no paperwork — just pick a time and show up.</p>
        </div>

        <div className="card">
          <h3>Transparent</h3>
          <p>Available hours are always visible and up to date.</p>
        </div>

        <div className="card">
          <h3>Reliable</h3>
          <p>Built for accuracy, security, and real-world use.</p>
        </div>
      </section>
    </div>
  );
}
