import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'adopter' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submitting form:', form)
    setError('')
    setLoading(true)
    try {
      await register(form)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Create Account 🐾</h2>
        <p className="text-gray-400 text-sm mb-6">Join and help pets find a home</p>

        {error && <p className="text-red-500 text-sm mb-4 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[['Full Name', 'name', 'text'], ['Email', 'email', 'email'], ['Password', 'password', 'password']].map(([label, key, type]) => (
            <div key={key}>
              <label className="text-sm text-gray-600">{label}</label>
              <input type={type} required
                className="w-full border rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
            </div>
          ))}
          <div>
            <label className="text-sm text-gray-600">I want to</label>
            <select className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
              value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
              <option value="adopter">Adopt a pet</option>
              <option value="owner">List my pet for adoption</option>
            </select>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 font-medium disabled:opacity-50">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account? <Link to="/login" className="text-orange-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}