import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PasswordInput from "../components/PasswordInput";

export default function Register() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        fullname,
        email,
        password,
      });

      alert("Registered successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full name"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setFullname(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password field */}
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="mb-4"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded font-medium hover:bg-green-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
