import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Login() {
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
      const response = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setMessage(response.data.message || "Login successful");

      setEmail("");
      setPassword("");

      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="space-y-1 text-center">
          <h2 className="text-3xl font-bold text-slate-800">Login</h2>
          <p className="text-sm text-slate-500">Welcome back</p>
        </div>

        {message && (
          <p className="rounded-lg bg-slate-100 p-3 text-sm text-slate-700">
            {message}
          </p>
        )}

        <input type="email"  placeholder="Enter your email"  value={email} className="w-full rounded-lg border border-slate-300 p-3 transition focus:outline-none focus:ring-2 focus:ring-blue-400"  onChange={(e) => setEmail(e.target.value)}/>

        <input type="password" placeholder="Enter your password" value={password} className="w-full rounded-lg border border-slate-300 p-3 transition focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setPassword(e.target.value)}/>

        <button type="submit" disabled={loading} className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-medium text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}