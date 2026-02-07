
import { Link2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import UrlForm from "../components/UrlForm";
import UserUrls from "../components/UserUrls";

const DashboardPage = () => {
  const queryClient = useQueryClient();

  const handleUrlCreated = () => {
    queryClient.invalidateQueries({ queryKey: ["userUrls"] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-700 to-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-900 rounded-2xl mb-3 shadow-lg shadow-purple-500/50">
            <Link2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-gray-400 text-sm">Create custom short URLs and manage your links</p>
        </div>

        {/* Main Content - Vertical Stack */}
        <div className="space-y-4">
          {/* UrlForm - Top */}
          <div>
            <div className="bg-gray-800 rounded-2xl shadow-xl p-4 backdrop-blur-sm bg-opacity-90 border border-gray-700">
              <h2 className="text-lg font-bold text-white mb-4">Create Short URL</h2>
              <UrlForm showCustomUrl={true} onUrlCreated={handleUrlCreated} />
            </div>
          </div>

          {/* UserUrls - Bottom */}
          <div>
            <div className="bg-gray-800 rounded-2xl shadow-xl p-4 backdrop-blur-sm bg-opacity-90 border border-gray-700">
              <UserUrls showDelete={true} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-gray-400 text-xs">
          <p>Fast, secure, and free URL shortening service</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;