import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">MK/NK</Link>
      </div>

      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/schedule">Book</Link>

        {!isLoggedIn && <Link to="/login">Login</Link>}
        {!isLoggedIn && <Link to="/register">Register</Link>}
        {isLoggedIn && <Link to="/profile">Profile</Link>}
      </nav>
    </header>
  );
}
