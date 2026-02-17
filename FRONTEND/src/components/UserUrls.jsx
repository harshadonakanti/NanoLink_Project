import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Copy, Link2, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { getAllUserUrls } from "../api/user.api.js";
import { deleteShortUrl } from "../api/shortUrl.api.js";

const BACKEND_URL = "https://nanolink-ofgx.onrender.com/";

const UserUrls = ({ showDelete = false }) => {
  const [copiedId, setCopiedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllUserUrls,
    enabled: isAuthenticated,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // ✅ FORCE array
  const urls = Array.isArray(data) ? data : [];

  const handleCopyUrl = (url, urlId) => {
    navigator.clipboard.writeText(url);
    setCopiedId(urlId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteUrl = async (urlId) => {
    setDeletingId(urlId);
    try {
      await deleteShortUrl(urlId);
      queryClient.invalidateQueries({ queryKey: ["userUrls"] });
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete URL");
    } finally {
      setDeletingId(null);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="mt-4 flex items-center justify-center py-8">
        <div className="text-center">
          <svg
            className="animate-spin h-8 w-8 text-emerald-400 mx-auto mb-2"
            viewBox="0 0 24 24"
          >
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
          <p className="text-gray-300 text-sm">Loading your URLs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="mb-4 flex items-center gap-2">
        <Link2 className="w-5 h-5 text-purple-400" />
        <div>
          <h2 className="text-lg font-bold text-gray-100">Your URLs</h2>
          <p className="text-gray-400 text-xs">
            {urls.length === 0 ? "No URLs yet" : `${urls.length} short URL${urls.length !== 1 ? "s" : ""}`}
          </p>
        </div>
      </div>

      {isError && (
        <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-300 px-3 py-2 rounded-lg mb-3 text-xs">
          {error?.response?.data?.message || error.message || "Something went wrong"}
        </div>
      )}

      {urls.length === 0 ? (
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-700 p-6 text-center mt-4">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-900/30 rounded-lg mb-2">
            <Link2 className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-gray-300 text-sm font-medium">No URLs Found</p>
          <p className="text-gray-500 text-xs mt-1">
            Create your first short URL to see it here
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {urls.map((urlItem) => (
            <div
              key={urlItem._id}
              className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-700 p-3 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
                {/* Short URL - Left */}
                <div className="lg:col-span-4 space-y-1">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Short URL
                  </label>
                  <input
                    type="text"
                    value={urlItem.shortUrl}
                    readOnly
                    className="w-full px-2 py-1 bg-gray-700/50 border border-gray-600 rounded text-purple-300 text-xs font-mono focus:outline-none"
                  />
                </div>

                {/* Full URL - Center */}
                <div className="lg:col-span-5 space-y-1">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Full URL
                  </label>
                  <input
                    type="text"
                    value={urlItem.fullUrl}
                    readOnly
                    className="w-full px-2 py-1 bg-gray-700/50 border border-gray-600 rounded text-gray-300 text-xs truncate focus:outline-none"
                    title={urlItem.fullUrl}
                  />
                </div>

                {/* Clicks - Right */}
                <div className="lg:col-span-3 space-y-1">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Clicks
                  </label>
                  <div className="bg-purple-900/20 rounded p-2 border border-emerald-500/20 text-center">
                    <p className="text-lg font-bold text-purple-400">
                      {urlItem.clicks || 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-2 pt-2 border-t border-gray-700 flex flex-wrap gap-2 justify-between">
                <button
                  onClick={() =>
                    handleCopyUrl(
                      `${BACKEND_URL}/${urlItem.shortUrl}`,
                      `${urlItem._id}-full`
                    )
                  }
                  className={`px-3 py-1 rounded transition font-medium text-xs flex items-center gap-1 whitespace-nowrap ${
                    copiedId === `${urlItem._id}-full`
                      ? "bg-green-900/40 text-green-200 border border-green-500/30"
                      : "bg-blue-900/40 text-blue-200 border border-emerald-500/30 hover:bg-emerald-800/50"
                  }`}
                >
                  {copiedId === `${urlItem._id}-full` ? (
                    <>
                      <Check className="w-3 h-3" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy Full Link
                    </>
                  )}
                </button>
                {showDelete && (
                  <button
                    onClick={() => handleDeleteUrl(urlItem._id)}
                    disabled={deletingId === urlItem._id}
                    className="px-3 py-1 bg-red-900/40 text-red-200 border border-red-500/30 rounded hover:bg-red-800/50 transition font-medium text-xs flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {deletingId === urlItem._id ? (
                      <>
                        <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserUrls;
