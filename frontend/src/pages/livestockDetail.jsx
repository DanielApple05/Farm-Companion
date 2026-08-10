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
import MobileNav from "../components/mobileNav";
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
  const [livestockTips, setLivestockTips] = useState([]);
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
    }
  };

  useEffect(() => {
    const fetchLivestock = async () => {
      try {
        setLoading(true);

        const response = await getLivestockById(id);

        setLivestock(response.data.livestock || null);

        const tips =
          response.data.livestockTips?.livestockTips ||
          response.data.livestockTips ||
          [];

        setLivestockTips(Array.isArray(tips) ? tips : []);
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            "Failed to load livestock"
        );
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
          <MobileNav />
          <main className="w-full pt-24 px-4 sm:px-6 pb-24 xl:pb-6 bg-gray-50 flex items-center justify-center">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Loader2
                size={16}
                className="animate-spin"
              />
              Loading livestock...
            </div>
          </main>
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
          <main className="w-full pt-24 px-4 sm:px-6 pb-24 xl:pb-6 bg-gray-50">
            {message && (
              <div className="bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl px-4 py-3">
                {message}
              </div>
            )}
          </main>
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

  return (
    <>
      <Header />

      <div className="flex min-h-screen">
        <Sidebar />
        <MobileNav />
        <main className="w-full px-4 sm:px-6  pb-24 xl:pb-6 bg-gray-50 space-y-4 sm:space-y-6 xl:mt-20 mt-24 ">

          {/* Back */}
          <Link
            to={
              livestock.farm?._id
                ? `/farms/${livestock.farm._id}`
                : "/livestock"
            }
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft size={14} />
            <span className="truncate">
              {livestock.farm?.name
                ? `Back to ${livestock.farm.name}`
                : "Back to livestock"}
            </span>
          </Link>

          {/* Livestock header */}
          <section className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

              <div className="flex items-start gap-3 min-w-0">

                <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <PawPrint
                    size={20}
                    className="text-amber-600"
                  />
                </div>

                <div className="min-w-0">
                  <h1 className="text-xl font-semibold text-gray-900 truncate">
                    {livestock.type}
                  </h1>

                  <p className="text-sm text-gray-500 flex items-start gap-1 mt-1">
                    <MapPin
                      size={12}
                      className="mt-0.5 shrink-0"
                    />

                    <span className="truncate">
                      {livestock.farm?.name}

                      {livestock.farm?.location &&
                        ` · ${livestock.farm.location}`}
                    </span>
                  </p>
                </div>

              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2">
                <span
                  className={`text-xs px-2.5 py-1.5 rounded-md ${
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

            {/* Information */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-5 pt-4 border-t border-gray-100">

              <div className="bg-gray-50 sm:bg-transparent rounded-lg p-3 sm:p-0">
                <p className="text-xs text-gray-400">
                  Stage
                </p>

                <p className="text-sm font-medium text-gray-900 mt-1">
                  {livestock.stage || "Not specified"}
                </p>
              </div>

              <div className="bg-gray-50 sm:bg-transparent rounded-lg p-3 sm:p-0">
                <p className="text-xs text-gray-400">
                  Headcount
                </p>

                <p className="text-sm font-medium text-gray-900 mt-1">
                  {livestock.headcount} heads
                </p>
              </div>

              <div className="bg-gray-50 sm:bg-transparent rounded-lg p-3 sm:p-0">
                <p className="text-xs text-gray-400">
                  Breed
                </p>

                <p className="text-sm font-medium text-gray-900 mt-1 truncate">
                  {livestock.breed || "Not specified"}
                </p>
              </div>

              <div className="bg-gray-50 sm:bg-transparent rounded-lg p-3 sm:p-0">
                <p className="text-xs text-gray-400">
                  Status
                </p>

                <p className="text-sm font-medium text-gray-900 mt-1 flex items-center gap-1">
                  <Activity size={13} />
                  {livestock.status}
                </p>
              </div>

            </div>
          </section>

          {/* Farm Advice */}
          <section className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4">

              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
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
                  Tips based on your{" "}
                  {livestock.type?.toLowerCase()}s current stage.
                </p>
              </div>

              {livestock.stage && (
                <div className="self-start flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-md">
                  <Sparkles size={12} />
                  {livestock.stage}
                </div>
              )}

            </div>

            {livestockTips.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-5 text-center">
                <Lightbulb
                  size={20}
                  className="mx-auto text-gray-300 mb-2"
                />

                <p className="text-xs text-gray-400">
                  No advice available for this stage yet.
                </p>
              </div>
            ) : (
              <div className="space-y-2">

                {livestockTips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-gray-50 rounded-xl p-3"
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

            <button
              type="button"
              className="w-full mt-4 flex items-center justify-center gap-2 text-sm py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 active:bg-green-800 transition-colors"
            >
              <Sparkles size={15} />
              Get AI advice
            </button>

          </section>

          {/* Upcoming Care */}
          <section className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">

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
                className="self-start sm:self-auto inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
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

            {vaccinations.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Syringe
                  size={20}
                  className="mx-auto text-gray-300 mb-2"
                />

                <p className="text-xs text-gray-400">
                  No scheduled vaccinations yet.
                </p>
              </div>
            ) : (
              <div className="space-y-2">

                {vaccinations.map((v, i) => {

                  const isOverdue =
                    new Date(v.dueDate) < new Date() &&
                    !v.completedOn;

                  return (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-gray-50 rounded-xl p-3"
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

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {v.name}
                        </p>

                        <p className="text-xs text-gray-500 mt-0.5">
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
                          className={`shrink-0 text-[11px] px-2 py-1 rounded-md ${
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
            )}

          </section>

          {/* Health Log */}
          <section className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">

            <div className="mb-4">
              <h2 className="font-medium text-gray-900">
                Health Log
              </h2>

              <p className="text-xs text-gray-400 mt-1">
                Track symptoms and AI-assisted health observations.
              </p>
            </div>

            {healthLogs.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-5 text-center">
                <Activity
                  size={20}
                  className="mx-auto text-gray-300 mb-2"
                />

                <p className="text-xs text-gray-400">
                  No health entries logged yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">

                {healthLogs.map((log, i) => (

                  <div
                    key={i}
                    className="bg-gray-50 rounded-xl p-3 sm:p-4"
                  >

                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-2">

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
            )}

            <button
              type="button"
              className="w-full mt-4 flex items-center justify-center gap-2 text-sm py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <PlusCircle size={14} />
              Log a new symptom
            </button>

          </section>

        </main>
      </div>
    </>
  );
};

export default LivestockDetail;
