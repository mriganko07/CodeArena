import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Still checking token — show nothing (or a spinner)
  if (loading) {
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        height: "100vh", background: "#050816", color: "#6C63FF",
        fontSize: "14px", fontFamily: "DM Sans, sans-serif"
      }}>
        Loading...
      </div>
    );
  }

  // Not logged in — redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Logged in — render the page
  return children;
}