import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice.js';
import { registerUser } from '../api/user.api';
import {  useNavigate } from '@tanstack/react-router';

export default function RegisterForm({state}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async () => {
  if (password.length < 8) {
    setError("Password must be at least 8 characters");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const data = await registerUser({ username, email, password });

    dispatch(login(data.user));
    navigate({ to: "/dashboard" });

  } catch (err) {
    setError(err.response?.data?.message || err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="w-full max-w-md">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full p-6 border border-gray-700">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Create Account</h1>
          <p className="text-gray-400 text-sm">Sign up to get started</p>
        </div>

        <div className="space-y-4">
          {error && (
            <div className="bg-red-500 bg-opacity-10 border border-red-500 text-white px-3 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="username" className="block text-xs font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-sm text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition placeholder-gray-400"
              placeholder="Choose a username"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-sm text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition placeholder-gray-400"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-sm text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition placeholder-gray-400"
              placeholder="Create a password"
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-pink-600 text-white py-2 rounded-lg font-semibold text-sm hover:from-emerald-700 hover:to-pink-700 transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating Account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-400 text-xs">
            Already have an account?{' '}
            <span onClick={()=>state(true)} className="text-purple-500 cursor-pointer hover:text-purple-400 font-semibold text-xs">
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
