import { useEffect, useState } from "react";
import {
  BookOpen,
  Leaf,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { getFarmManagementTips } from "../../api/farmKnowledge";

const FarmKnowledgeDaily = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTips = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getFarmManagementTips();

      setTips(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error(
        "Error fetching farm knowledge:",
        error
      );

      setError(
        "Unable to load today's farm knowledge."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTips();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="font-semibold text-gray-900">
            Today's Tips
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            A few things worth knowing today.
          </p>
        </div>
      </div>
      <section className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
              <BookOpen
                size={18}
                className="text-green-600"
              />
            </div>

            <div className="min-w-0">
              <h2 className="font-semibold text-gray-900">
                Today's Farm Knowledge
              </h2>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Practical knowledge to help you manage your farm better.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
              <Loader2
                size={20}
                className="animate-spin"
              />

              <p className="text-sm mt-2">
                Loading farm knowledge...
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <BookOpen
                size={24}
                className="text-gray-300"
              />

              <p className="text-sm text-gray-600 mt-2">
                {error}
              </p>

              <button
                type="button"
                onClick={fetchTips}
                className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-green-600 hover:text-green-700"
              >
                <RefreshCw size={13} />
                Try again
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && tips.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Leaf
                size={24}
                className="text-gray-300"
              />

              <p className="text-sm text-gray-500 mt-2">
                No farm knowledge available today.
              </p>
            </div>
          )}

          {/* Tips */}
          {!loading && !error && tips.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tips.map((tip, index) => (
                <article
                  key={tip.id || index}
                  className="
                  group
                  rounded-xl
                  border border-gray-100
                  bg-gray-50/70
                  p-4
                  transition-all
                  hover:border-green-200
                  hover:bg-green-50/40
                "
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0">
                      <Leaf
                        size={15}
                        className="text-green-600"
                      />
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 leading-snug">
                        {tip.title}
                      </h3>

                      <p className="text-xs text-gray-500 leading-relaxed mt-2">
                        {tip.body}
                      </p>

                      {tip.category && (
                        <span className="inline-flex mt-3 text-[11px] text-green-700 bg-green-50 px-2 py-1 rounded-md">
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
      </section>
    </>
  );
};

export default FarmKnowledgeDaily;
