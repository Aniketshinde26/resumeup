import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
        setMessage(res.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  // 🔥 Logout function
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true }); // Call backend logout

      // 🔥 Remove access token if stored in localStorage/sessionStorage
      localStorage.removeItem("accessToken");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to logout");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {/* 🔥 Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <p className="mb-4">{message}</p>

      {user && (
        <div>
          <p>ID: {user.id}</p>
          <p>Email: {user.email}</p>
          <p>Name: {user.fullname}</p>
        </div>
      )}
    </div>
  );
}
