import React, { useState } from 'react';
import { Link2, Copy, Check, Sparkles } from 'lucide-react';
import { useSelector } from 'react-redux';
import { createShortUrl, createCustomShortUrl } from '../api/shortUrl.api';

// ========================================
// UrlForm.jsx Component
// ========================================
const UrlForm = ({ showCustomUrl = false, onUrlCreated = null }) => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [customUrl, setCustomUrl] = useState('');
  const { isAuthenticated } = useSelector((state) => state.auth);

  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!longUrl.trim()) return;

    if (!isValidUrl(longUrl)) {
      setError("Please enter a valid URL (must start with http:// or https://)");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      let result;
      
      // If custom URL is provided and showCustomUrl is true, use custom URL endpoint
      if (customUrl.trim() && showCustomUrl && isAuthenticated) {
        if (!customUrl.trim()) {
          setError("Custom URL cannot be empty");
          setIsLoading(false);
          return;
        }
        result = await createCustomShortUrl(longUrl, customUrl);
        setCustomUrl("");
      } else {
        // Use regular short URL endpoint
        result = await createShortUrl(longUrl);
      }
      
      setShortUrl(result);
      setLongUrl("");
      
      // Call the callback to refetch user URLs
      if (onUrlCreated) {
        onUrlCreated();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create short URL");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input Section */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-300 mb-1">
          Enter your long URL
        </label>
        <div className="relative">
          <input
            type="url"
            value={longUrl}
            onChange={(e) => {
              setLongUrl(e.target.value);
              setError("");
            }}
            placeholder="https://example.com/very/long/url/that/needs/shortening"
            className="w-full px-3 py-2 pr-10 bg-gray-900 border-2 border-gray-700 rounded-lg focus:border-emerald-500 focus:ring-3 focus:ring-purple-500/20 outline-none transition-all text-sm text-gray-200 placeholder-gray-500"
          />
          <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
            <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span>
            {error}
          </p>
        )}
      </div>

      {/* Shorten Button */}
      <button
        type="submit"
        disabled={!longUrl.trim() || isLoading}
        className="w-full bg-gradient-to-r from-emerald-600 text-black text-base to-emerald-900  py-2 rounded-lg  font-bold  hover:from-emerald-300 hover:to-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Shortening...
          </span>
        ) : (
          "Get Shortened URL"
        )}
      </button>

      {/* Custom URL Section - Only show in Dashboard for authenticated users */}
      {showCustomUrl && isAuthenticated && (
        <div className="mt-4 p-4 bg-gradient-to-br from-emerald-900/50 to-gray-900/50 rounded-lg border-2 border-emerald-500/30">
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Custom URL (optional)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customUrl}
              onChange={(event) => setCustomUrl(event.target.value)}
              placeholder="Enter the Custom URL"
              className="flex-1 px-3 py-2 bg-gray-900 border-2 border-emerald-200/50 rounded-lg text-sm text-gray-200 font-medium focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>
      )}

      {/* Result Section */}
      {shortUrl && (
        <div className="mt-4 p-4 bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-lg border-2 border-green-500/30">
          <label className="block text-xs font-medium text-gray-300 mb-2">
            ✅ Your shortened URL is ready!
          </label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-gray-900 border-2 border-green-500/50 rounded-lg text-green-400 font-medium focus:outline-none text-xs"
            />
            <button
              type="button"
              onClick={copyToClipboard}
              className={`px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-1 whitespace-nowrap text-xs ${
                copied
                  ? "bg-green-600 text-white border border-green-500"
                  : "bg-green-900/50 text-green-200 border border-green-500/50 hover:bg-green-800/50"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy URL
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default UrlForm;