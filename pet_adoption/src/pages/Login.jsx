import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Login:', form)
    }

    return (
        <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome back 👋</h2>
                <p className="text-gray-400 text-sm mb-6">Login to continue</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input type="email" required className="w-full border rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Password</label>
                        <input type="password" required className="w-full border rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                            value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                    </div>
                    <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 font-medium">
                        Login
                    </button>
                </form>

                <p className="text-sm text-center text-gray-500 mt-4">
                    Don't have an account? <Link to="/register" className="text-orange-500 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    )
}