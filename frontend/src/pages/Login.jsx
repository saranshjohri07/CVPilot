import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../services/api'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await API.post('/auth/login', { email, password })
      login(response.data.access_token)
      navigate('/upload')
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center 
                    justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 
                      w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl 
                          flex items-center justify-center">
            <span className="text-white font-black text-lg">C</span>
          </div>
          <span className="text-2xl font-bold text-slate-800">
            CVPilot
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-900 
                       text-center mb-1">
          Welcome back
        </h1>
        <p className="text-slate-500 text-center text-sm mb-8">
          Enter your details to sign in
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 
                          text-red-600 text-sm rounded-lg 
                          px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-slate-200 
                       rounded-xl text-slate-800 placeholder-slate-400
                       focus:outline-none focus:border-blue-500 
                       focus:ring-2 focus:ring-blue-100 transition text-sm"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-200 
                         rounded-xl text-slate-800 placeholder-slate-400
                         focus:outline-none focus:border-blue-500
                         focus:ring-2 focus:ring-blue-100
                         transition text-sm pr-16"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 
                         text-xs text-slate-400 hover:text-blue-600
                         transition font-medium">
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 
                       rounded-xl font-semibold text-sm
                       hover:bg-blue-700 transition
                       disabled:opacity-50
                       shadow-lg shadow-blue-100">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register"
                className="text-blue-600 font-semibold hover:underline">
            Create one
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login