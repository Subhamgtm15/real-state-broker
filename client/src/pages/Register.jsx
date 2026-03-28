import { useState } from "react"
import api from "../services/api"

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setMessage("")

        try {
            const response = await api.post("/auth/register", {name,email,password})
            setMessage(response.data.message || "Registration successful")
            setName("")
            setEmail("")
            setPassword("")
        } catch (error) {
            setMessage(error.response?.data?.message || "Registration failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl space-y-5">
                <div className="space-y-1 text-center">
                    <h2 className="text-3xl font-bold text-slate-800">Create Account</h2>
                </div>

                {message && (
                    <p className="rounded-lg bg-slate-100 p-3 text-sm text-slate-700">
                        {message}
                    </p>
                )}

                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    className="w-full rounded-lg border border-slate-300 p-3 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    className="w-full rounded-lg border border-slate-300 p-3 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    className="w-full rounded-lg border border-slate-300 p-3 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    )
}