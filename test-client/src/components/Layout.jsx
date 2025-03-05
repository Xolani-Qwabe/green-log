import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/status", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/auth/logout", { withCredentials: true });

        if (response.status === 200) {
            setIsLoggedIn(false);
            navigate("/login");
        }
    } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
    }
};


  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <nav style={{ padding: "1rem", background: "#333", color: "#fff", display: "flex", gap: "1rem" }}>
        <Link to="/home" style={{ color: "#fff", textDecoration: "none" }}>Home</Link>
        {!isLoggedIn ? (
          <>
            <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>Login</Link>
            <Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>Sign Up</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={{ background: "red", color: "#fff", border: "none", cursor: "pointer" }}>Logout</button>
        )}
      </nav>

      {/* Page Content */}
      <main style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
