import { useState, useEffect } from "react";
import { Newspaper, ExternalLink, Lightbulb, Loader2 } from "lucide-react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import { getAgricultureNews } from "../api/news";
// import WeeklyTip  from "../components/weeklyTip";
// import MonthlyTip from "../components/monthlyTip";


const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getAgricultureNews();
        setArticles(response.data.results || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load news");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="w-full p-6 space-y-8 mt-20 bg-gray-50">
          {/* Page header */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">News & Tips</h1>
            <p className="text-gray-500 text-sm mt-1">Stay informed and keep learning.</p>
          </div>

          {/* Live news feed */}
          <div>
            <h2 className="font-medium text-gray-900 flex items-center gap-2 mb-4">
              <Newspaper size={16} className="text-green-600" />
              Latest Agriculture News
            </h2>

            {loading && (
              <div className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-2 text-gray-500 text-sm">
                <Loader2 size={16} className="animate-spin" />
                Loading news...
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            {!loading && !error && articles.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-5 text-sm text-gray-400">
                No news articles found right now — check back later.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {articles.map((article, i) => (
                <a
                  key={i}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-green-300 transition-colors flex flex-col"
                >
                  {article.image_url ? (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-32 object-cover"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  ) : (
                    <div className="w-full h-32 bg-green-50 flex items-center justify-center">
                      <Newspaper size={24} className="text-green-300" />
                    </div>
                  )}
                  <div className="p-4 flex-1 flex flex-col">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">{article.title}</p>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2 flex-1">
                      {article.description || "No summary available."}
                    </p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                      <span className="text-xs text-gray-400">
                        {article.source_id} · {new Date(article.pubDate).toLocaleDateString()}
                      </span>
                      <ExternalLink size={12} className="text-gray-400" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Curated tips & guides */}
          <div className="space-y-5">
            <h2 className="font-medium text-gray-900 flex items-center gap-2 mb-4">
              Tips & Guides
            </h2>
            {/* <WeeklyTip />
            <MonthlyTip /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default News;