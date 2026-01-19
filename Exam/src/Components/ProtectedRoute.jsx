import { Navigate } from "react-router-dom";
import { useProfile } from "../Hooks/useProfile";

export default function ProtectedRoute({ children }) {
  const { isLoading, isError } = useProfile();

  if (isLoading) {
    return <p style={{ padding: 20 }}>Checking authentication...</p>;
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
