import React from 'react'
import UrlForm from '../components/UrlForm'
import { Link2 } from 'lucide-react';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-900 rounded-2xl mb-4 shadow-lg shadow-purple-500/50">
            <Link2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">URL Shortener</h1>
          <p className="text-gray-400">Transform your long URLs into short, shareable links</p>
        </div>

        {/* Main Card - UrlForm goes INSIDE here */}
        <div className="bg-gray-800 rounded-3xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-90 border border-gray-700">
          <UrlForm />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>Fast, secure, and free URL shortening service</p>
        </div>
      </div>
    </div>
  )
}

export default Homepage