import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 const API_URL = "https://numbr-exq6.onrender.com";

  const handleSubmit =async (e) =>{
        e.preventDefault();
    try {
    const response = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: username, pass: password }),
    });

    if (response.ok) {
     const data = await response.json();
     const token= data.data.token;
      localStorage.setItem('token', token); // Store token in localStorage
      console.log('Login successful:', data);
      onLogin(); // Call the onLogin prop to update the app state
      navigate('/admin', { replace: true });

    } else {
      alert('Invalid credentials');
    }
  } catch (error) {
    console.error('Login failed:', error);
    alert('Login failed. Please try again.');
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Left Section: Welcome Back */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-white via-gray-100 to-gray-300 p-10 items-center justify-center">
          <div className="text-center space-y-6 max-w-xs">
            <h2 className="text-4xl font-extrabold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600 text-base">
              Access the Numbr Admin Panel and manage everything in one place.
            </p>
            <img
              src="/barber.png"
              alt="Login Illustration"
              className="w-56 h-76 mx-auto"
            />
          </div>
        </div>

        {/* Right Section: Login Form */}
        <div className="w-full md:w-1/2 p-10 sm:p-12">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Admin Login</h1>
            <p className="text-sm text-gray-500">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="e.g. admin"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-xs text-center text-gray-500">
            © {new Date().getFullYear()} Numbr Admin. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
