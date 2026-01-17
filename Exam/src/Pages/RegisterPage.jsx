import { useState } from "react";
import { useRegister } from "../Hooks/useRegister";
import { useNavigate, Link } from "react-router-dom";
import "./RegisterPage.css";

export default function RegisterPage() {
  const register = useRegister();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    register.mutate(
      { username, email, password },
      { onSuccess: () => navigate("/profile") }
    );
  }

  return (
    <div className="auth-page">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button disabled={register.isPending}>
          {register.isPending ? "Loading..." : "Register"}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
