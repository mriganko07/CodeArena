import { useEffect } from "react";
import { handleGoogleCallback } from "../hooks/useAuth";

export default function AuthCallback() {
  useEffect(() => {
    const token = handleGoogleCallback();
    if (token) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/login?error=google_failed";
    }
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#050816", color: "#fff" }}>
      <p>Signing you in with Google...</p>
    </div>
  );
}