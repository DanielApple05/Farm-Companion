import { useEffect, useState } from "react";
import {
  BookOpen,
  ChevronRight,
  Leaf,
  Loader2,
} from "lucide-react";
import { getFarmManagementTips } from "../api/farmKnowledge";

const FarmKnowledgeDaily = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await getFarmManagementTips();
        setTips(response.data || []);
      } catch (error) {
        console.error(
          "Error fetching general farm management tips:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  const displayedTips = tips.slice(0, 4);

  return (
    <section className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-gray-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
            <BookOpen
              size={18}
              className="text-green-600"
            />
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              Farm Knowledge
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Practical knowledge to help you manage your farm better.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="hidden sm:flex items-center gap-1 text-xs font-medium text-green-600 hover:text-green-700 transition-colors"
        >
          View all
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        {loading ? (
          <div className="flex items-center justify-center py-8 text-gray-400">
            <Loader2
              size={18}
              className="animate-spin mr-2"
            />
            <span className="text-sm">
              Loading farm knowledge...
            </span>
          </div>
        ) : displayedTips.length === 0 ? (
          <div className="py-8 text-center">
            <Leaf
              size={24}
              className="mx-auto text-gray-300"
            />

            <p className="text-sm text-gray-500 mt-2">
              No farm knowledge available right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {displayedTips.map((tip) => (
              <article
                key={tip.id}
                className="group rounded-xl border border-gray-100 bg-gray-50/70 p-4 hover:border-green-200 hover:bg-green-50/40 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0">
                    <Leaf
                      size={15}
                      className="text-green-600"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-medium text-gray-900 leading-snug">
                        {tip.title}
                      </h3>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed mt-2 line-clamp-3">
                      {tip.body}
                    </p>

                    {tip.category && (
                      <span className="inline-block mt-3 text-[11px] text-green-700 bg-green-50 px-2 py-1 rounded-md">
                        {tip.category}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Mobile footer */}
      {!loading && displayedTips.length > 0 && (
        <div className="sm:hidden border-t border-gray-100 px-5 py-3">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-1 text-sm font-medium text-green-600"
          >
            Explore more farm knowledge
            <ChevronRight size={15} />
          </button>
        </div>
      )}
    </section>
  );
};

export default FarmKnowledgeDaily;
