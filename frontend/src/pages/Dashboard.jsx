import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the protected route
        const res = await api.get("/auth/me"); // or "/auth/me"
        setUser(res.data.user);
        setMessage(res.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
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
