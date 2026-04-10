import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("/auth/register", {name,email,password});

      setMessage(response.data.message || "Registration successful");
      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5 rounded-xl border border-gray-200 bg-white p-8">
        <div className="space-y-1 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-sm text-gray-400">Sign up to continue</p>
        </div>

        {message && (
          <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-600 border border-gray-200">
            {message}
          </p>
        )}

        <input type="text" placeholder="Enter your name" value={name} className="w-full rounded-lg border border-gray-200 p-3 transition focus:outline-none focus:ring-1 focus:ring-gray-400" onChange={(e) => setName(e.target.value)}/>

        <input type="email" placeholder="Enter your email" value={email} className="w-full rounded-lg border border-gray-200 p-3 transition focus:outline-none focus:ring-1 focus:ring-gray-400" onChange={(e) => setEmail(e.target.value)}/>

        <input type="password" placeholder="Enter your password" value={password} className="w-full rounded-lg border border-gray-200 p-3 transition focus:outline-none focus:ring-1 focus:ring-gray-400" onChange={(e) => setPassword(e.target.value)}/>

        <button type="submit" disabled={loading} className="w-full rounded-lg bg-neutral-900 p-3 font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-neutral-900 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}