import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, PawPrint, Loader2, Syringe, Droplet, MessageCircle, PlusCircle } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getLivestockById, deleteLivestock } from "../api/livestock";
import AddLivestockModal from "../components/addLivestockModal";
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
  const [vaccinationModalOpen, setVaccinationModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteLivestock(id);
      navigate(livestock.farm?._id ? `/farms/${livestock.farm._id}` : "/livestock");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to delete liveStock");
      console.log(error.response?.data)
    }
  };

  useEffect(() => {
    const fetchLivestock = async () => {
      try {
        setLoading(true);
        const response = await getLivestockById(id);
        setLivestock(response.data);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to load livestock");
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
            <Loader2 size={16} className="animate-spin" />
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

  const vaccinations = [...(livestock.vaccinations || [])].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );
  const healthLogs = [...(livestock.healthLogs || [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="w-full p-6 space-y-6 mt-20 bg-gray-50">
          {/* Back link */}
          <Link
            to={livestock.farm?._id ? `/farms/${livestock.farm._id}` : "/livestock"}
            className="text-sm text-gray-500 flex items-center gap-1 hover:text-gray-700"
          >
            <ArrowLeft size={14} />
            {livestock.farm?.name ? `Back to ${livestock.farm.name}` : "Back to livestock"}
          </Link>

          {/* Livestock header */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-amber-50 flex items-center justify-center">
                  <PawPrint size={20} className="text-amber-600" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">{livestock.type}</h1>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin size={12} />
                    {livestock.farm?.name} {livestock.farm?.location && `· ${livestock.farm.location}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-md ${statusStyles[livestock.status]}`}>
                  {livestock.status}
                </span>
                <DeleteButton onDelete={handleDelete} label="Delete Livestock" />
              </div>
            </div>

            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600">
              <span>{livestock.headcount} heads</span>
              {livestock.breed && <span>{livestock.breed}</span>}
            </div>
          </div>

          {/* Upcoming care / vaccinations */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-gray-900">Upcoming Care</h2>
              <button
                onClick={() => setVaccinationModalOpen(true)}
                className="flex items-center gap-1 text-sm text-green-600"
              >
                <PlusCircle size={14} />
                Schedule
              </button>
            </div>

            {vaccinationModalOpen && (
              <AddVaccinationModal
                livestockId={livestock._id}
                onClose={() => setVaccinationModalOpen(false)}
                onAdded={(updatedLivestock) => setLivestock(updatedLivestock)}
              />
            )}

            {vaccinations.length === 0 && (
              <p className="text-xs text-gray-400">No scheduled vaccinations yet.</p>
            )}

            <div className="space-y-3">
              {vaccinations.map((v, i) => {
                const isOverdue = new Date(v.dueDate) < new Date() && !v.completedOn;
                return (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${v.completedOn ? "bg-green-50" : isOverdue ? "bg-red-50" : "bg-amber-50"
                        }`}
                    >
                      {v.completedOn ? (
                        <Droplet size={14} className="text-green-600" />
                      ) : (
                        <Syringe size={14} className={isOverdue ? "text-red-600" : "text-amber-600"} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{v.name}</p>
                      <p className="text-xs text-gray-500">
                        {v.completedOn
                          ? `Completed ${new Date(v.completedOn).toLocaleDateString()}`
                          : `Due ${new Date(v.dueDate).toLocaleDateString()}`}
                      </p>
                    </div>
                    {!v.completedOn && (
                      <span
                        className={`text-xs px-2 py-1 rounded-md ${isOverdue ? "bg-red-50 text-red-700" : "bg-gray-100 text-gray-500"
                          }`}
                      >
                        {isOverdue ? "Overdue" : "Scheduled"}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Health log */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="font-medium text-gray-900 mb-4">Health Log</h2>

            {healthLogs.length === 0 && (
              <p className="text-xs text-gray-400">No health entries logged yet.</p>
            )}

            <div className="space-y-3">
              {healthLogs.map((log, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900">{log.note}</p>
                    <span className="text-xs text-gray-400">
                      {new Date(log.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {log.aiResponse ? (
                    <p className="text-xs text-gray-600 leading-relaxed">{log.aiResponse}</p>
                  ) : (
                    <button className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <MessageCircle size={12} />
                      Ask Claude about this
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button className="w-full mt-4 flex items-center justify-center gap-2 text-sm py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
              Log a new symptom
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LivestockDetail;