import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  PawPrint,
  Loader2,
  Syringe,
  Droplet,
  MessageCircle,
  PlusCircle,
  Lightbulb,
  Sparkles,
  Activity,
} from "lucide-react";

import Sidebar from "../components/sidebar";
import Header from "../components/header";
import {
  getLivestockById,
  deleteLivestock,
} from "../api/livestock";

import AddVaccinationModal from "../components/addVacinationModal";
import DeleteButton from "../components/deleteButton";

const statusStyles = {
  Healthy: "bg-green-50 text-green-700",
  "Due for vaccination": "bg-red-50 text-red-700",
  Flagged: "bg-amber-50 text-amber-700",
};

const LivestockDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [livestock, setLivestock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [vaccinationModalOpen, setVaccinationModalOpen] =
    useState(false);

  const handleDelete = async () => {
    try {
      await deleteLivestock(id);

      navigate(
        livestock.farm?._id
          ? `/farms/${livestock.farm._id}`
          : "/livestock"
      );
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to delete livestock"
      );

      console.error(error.response?.data);
    }
  };

  useEffect(() => {
    const fetchLivestock = async () => {
      try {
        setLoading(true);

        const response = await getLivestockById(id);

        setLivestock(response.data);
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            "Failed to load livestock"
        );

        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchLivestock();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />

        <div className="flex min-h-screen">
          <Sidebar />

          <div className="w-full p-6 mt-20 bg-gray-50 flex items-center gap-2 text-gray-500">
            <Loader2
              size={16}
              className="animate-spin"
            />
            Loading livestock...
          </div>
        </div>
      </>
    );
  }

  if (!livestock) {
    return (
      <>
        <Header />

        <div className="flex min-h-screen">
          <Sidebar />

          <div className="w-full p-6 mt-20 bg-gray-50">
            {message && (
              <div className="bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl px-4 py-3">
                {message}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  const vaccinations = [
    ...(livestock.vaccinations || []),
  ].sort(
    (a, b) =>
      new Date(a.dueDate) -
      new Date(b.dueDate)
  );

  const healthLogs = [
    ...(livestock.healthLogs || []),
  ].sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  );

  /*
   * Supports both:
   *
   * livestock.livestockTips
   *
   * and
   *
   * livestock.tips
   *
   * so the UI doesn't break while the backend is being connected.
   */
  const livestockTips =
    livestock.livestockTips ||
    livestock.tips ||
    [];

  return (
    <>
      <Header />

      <div className="flex min-h-screen">
        <Sidebar />

        <div className="w-full p-6 space-y-6 mt-20 bg-gray-50">

          {/* Back link */}
          <Link
            to={
              livestock.farm?._id
                ? `/farms/${livestock.farm._id}`
                : "/livestock"
            }
            className="text-sm text-gray-500 flex items-center gap-1 hover:text-gray-700"
          >
            <ArrowLeft size={14} />

            {livestock.farm?.name
              ? `Back to ${livestock.farm.name}`
              : "Back to livestock"}
          </Link>

          {/* Livestock Header */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-lg bg-amber-50 flex items-center justify-center">
                  <PawPrint
                    size={20}
                    className="text-amber-600"
                  />
                </div>

                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {livestock.type}
                  </h1>

                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin size={12} />

                    {livestock.farm?.name}

                    {livestock.farm?.location &&
                      ` · ${livestock.farm.location}`}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-2">

                <span
                  className={`text-xs px-2 py-1 rounded-md ${
                    statusStyles[livestock.status] ||
                    "bg-gray-50 text-gray-600"
                  }`}
                >
                  {livestock.status}
                </span>

                <DeleteButton
                  onDelete={handleDelete}
                  label="Delete Livestock"
                />

              </div>
            </div>

            {/* Livestock information */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-4 border-t border-gray-100">

              <div>
                <p className="text-xs text-gray-400">
                  Stage
                </p>

                <p className="text-sm font-medium text-gray-900 mt-1">
                  {livestock.stage || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Headcount
                </p>

                <p className="text-sm font-medium text-gray-900 mt-1">
                  {livestock.headcount} heads
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Breed
                </p>

                <p className="text-sm font-medium text-gray-900 mt-1">
                  {livestock.breed || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Status
                </p>

                <p className="text-sm font-medium text-gray-900 mt-1 flex items-center gap-1">
                  <Activity size={13} />
                  {livestock.status}
                </p>
              </div>

            </div>
          </div>

          {/* Farm Advice */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">

            <div className="flex items-start justify-between mb-4">

              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                    <Lightbulb
                      size={16}
                      className="text-green-600"
                    />
                  </div>

                  <h2 className="font-medium text-gray-900">
                    Farm Advice
                  </h2>
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Tips based on your {livestock.type?.toLowerCase()}s
                  current stage.
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-md">
                <Sparkles size={12} />
                {livestock.stage}
              </div>

            </div>

            {livestockTips.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-400">
                  No advice available for this stage yet.
                </p>
              </div>
            ) : (
              <div className="space-y-2">

                {livestockTips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex gap-3 bg-gray-50 rounded-lg p-3"
                  >
                    <div className="w-6 h-6 shrink-0 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-xs text-green-700 font-medium">
                        {index + 1}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {tip}
                    </p>
                  </div>
                ))}

              </div>
            )}

            {/* AI advisory */}
            <button
              type="button"
              className="w-full mt-4 flex items-center justify-center gap-2 text-sm py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              <Sparkles size={15} />
              Get AI advice
            </button>

          </div>

          {/* Upcoming Care */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">

            <div className="flex items-center justify-between mb-4">

              <div>
                <h2 className="font-medium text-gray-900">
                  Upcoming Care
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  Keep track of vaccinations and scheduled care.
                </p>
              </div>

              <button
                onClick={() =>
                  setVaccinationModalOpen(true)
                }
                className="flex items-center gap-1 text-sm text-green-600"
              >
                <PlusCircle size={14} />
                Schedule
              </button>

            </div>

            {vaccinationModalOpen && (
              <AddVaccinationModal
                livestockId={livestock._id}
                onClose={() =>
                  setVaccinationModalOpen(false)
                }
                onAdded={(updatedLivestock) =>
                  setLivestock(updatedLivestock)
                }
              />
            )}

            {vaccinations.length === 0 && (
              <p className="text-xs text-gray-400">
                No scheduled vaccinations yet.
              </p>
            )}

            <div className="space-y-3">

              {vaccinations.map((v, i) => {

                const isOverdue =
                  new Date(v.dueDate) <
                    new Date() &&
                  !v.completedOn;

                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
                  >

                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        v.completedOn
                          ? "bg-green-50"
                          : isOverdue
                          ? "bg-red-50"
                          : "bg-amber-50"
                      }`}
                    >
                      {v.completedOn ? (
                        <Droplet
                          size={14}
                          className="text-green-600"
                        />
                      ) : (
                        <Syringe
                          size={14}
                          className={
                            isOverdue
                              ? "text-red-600"
                              : "text-amber-600"
                          }
                        />
                      )}
                    </div>

                    <div className="flex-1">

                      <p className="text-sm font-medium text-gray-900">
                        {v.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {v.completedOn
                          ? `Completed ${new Date(
                              v.completedOn
                            ).toLocaleDateString()}`
                          : `Due ${new Date(
                              v.dueDate
                            ).toLocaleDateString()}`}
                      </p>

                    </div>

                    {!v.completedOn && (
                      <span
                        className={`text-xs px-2 py-1 rounded-md ${
                          isOverdue
                            ? "bg-red-50 text-red-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {isOverdue
                          ? "Overdue"
                          : "Scheduled"}
                      </span>
                    )}

                  </div>
                );
              })}

            </div>
          </div>

          {/* Health Log */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">

            <div className="mb-4">
              <h2 className="font-medium text-gray-900">
                Health Log
              </h2>

              <p className="text-xs text-gray-400 mt-1">
                Track symptoms and AI-assisted health observations.
              </p>
            </div>

            {healthLogs.length === 0 && (
              <p className="text-xs text-gray-400">
                No health entries logged yet.
              </p>
            )}

            <div className="space-y-3">

              {healthLogs.map((log, i) => (

                <div
                  key={i}
                  className="bg-gray-50 rounded-lg p-4"
                >

                  <div className="flex items-center justify-between mb-2">

                    <p className="text-sm font-medium text-gray-900">
                      {log.note}
                    </p>

                    <span className="text-xs text-gray-400">
                      {new Date(
                        log.createdAt
                      ).toLocaleDateString()}
                    </span>

                  </div>

                  {log.aiResponse ? (
                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                      <div className="flex items-center gap-1 text-xs text-green-600 mb-1">
                        <Sparkles size={12} />
                        AI observation
                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed">
                        {log.aiResponse}
                      </p>
                    </div>
                  ) : (
                    <button className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <MessageCircle size={12} />
                      Ask AI about this
                    </button>
                  )}

                </div>

              ))}

            </div>

            <button
              type="button"
              className="w-full mt-4 flex items-center justify-center gap-2 text-sm py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <PlusCircle size={14} />
              Log a new symptom
            </button>

          </div>

        </div>
      </div>
    </>
  );
};

export default LivestockDetail;
