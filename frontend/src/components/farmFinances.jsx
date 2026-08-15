import { useState, useEffect } from "react";
import { Wallet, Tag, PlusCircle, TrendingDown, TrendingUp, AlertCircle, Loader2 } from "lucide-react";
import { getExpenses, getSales } from "../api/finances";
import AddExpenseModal from "./addExpenseModal";
import AddSaleModal from "./addSaleModal";

const categoryStyles = {
  Seeds: "bg-green-50 text-green-700",
  Fertilizer: "bg-amber-50 text-amber-700",
  Labor: "bg-blue-50 text-blue-700",
  Equipment: "bg-gray-100 text-gray-700",
  Veterinary: "bg-red-50 text-red-700",
  Other: "bg-gray-100 text-gray-700",
};

const FarmFinances = ({ farmId, crops, livestock }) => {
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const [sales, setSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalOwed, setTotalOwed] = useState(0);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [saleModalOpen, setSaleModalOpen] = useState(false);

  useEffect(() => {
    const fetchFinances = async () => {
      try {
        setLoading(true);
        const [expenseRes, saleRes] = await Promise.all([
          getExpenses(farmId),
          getSales(farmId),
        ]);

        setExpenses(expenseRes.data.expenses);
        setTotalExpenses(expenseRes.data.total);

        setSales(saleRes.data.sales);
        setTotalSales(saleRes.data.totalSales);
        setTotalOwed(saleRes.data.totalOwed);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to load finances");
      } finally {
        setLoading(false);
      }
    };

    if (farmId) fetchFinances();
  }, [farmId]);

  const netPosition = totalSales - totalExpenses;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-6">
      <h2 className="font-medium text-gray-900">Finances</h2>

      {message && (
        <div className="bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl px-4 py-3">
          {message}
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Loader2 size={16} className="animate-spin" />
          Loading finances...
        </div>
      ) : (
        <>
          {/* Summary */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                <TrendingDown size={12} />
                Spent
              </p>
              <p className="text-lg font-semibold text-gray-900">₦{totalExpenses.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                <TrendingUp size={12} />
                Sales
              </p>
              <p className="text-lg font-semibold text-gray-900">₦{totalSales.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Net</p>
              <p className={`text-lg font-semibold ${netPosition >= 0 ? "text-green-600" : "text-red-600"}`}>
                {netPosition >= 0 ? "+" : "-"}₦{Math.abs(netPosition).toLocaleString()}
              </p>
            </div>
          </div>

          {totalOwed > 0 && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-lg px-3 py-2">
              <AlertCircle size={14} />
              ₦{totalOwed.toLocaleString()} still owed to you across all sales
            </div>
          )}

          {/* Expenses */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Wallet size={14} className="text-gray-500" />
                Expenses
              </h3>
              <button
                onClick={() => setExpenseModalOpen(true)}
                className="flex items-center gap-1 text-xs text-green-600"
              >
                <PlusCircle size={12} />
                Add
              </button>
            </div>
            {expenses.length === 0 && (
              <p className="text-xs text-gray-400">No expenses logged yet.</p>
            )}
            <div className="space-y-2">
              {expenses.map((e) => (
                <div key={e._id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div>
                    <p className="text-sm text-gray-900">{e.description}</p>
                    <p className="text-xs text-gray-500">{new Date(e.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-md ${categoryStyles[e.category]}`}>
                      {e.category}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      ₦{e.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sales */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Tag size={14} className="text-gray-500" />
                Sales
              </h3>
              <button
                onClick={() => setSaleModalOpen(true)}
                className="flex items-center gap-1 text-xs text-green-600"
              >
                <PlusCircle size={12} />
                Add
              </button>
            </div>
            {sales.length === 0 && (
              <p className="text-xs text-gray-400">No sales recorded yet.</p>
            )}
            <div className="space-y-2">
              {sales.map((s) => (
                <div key={s._id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div>
                    <p className="text-sm text-gray-900">{s.description}</p>
                    <p className="text-xs text-gray-500">
                      {s.buyer} · {new Date(s.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">₦{s.amount.toLocaleString()}</p>
                    {s.amountOwed > 0 ? (
                      <p className="text-xs text-red-600">₦{s.amountOwed.toLocaleString()} owed</p>
                    ) : (
                      <p className="text-xs text-green-600">Paid in full</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {expenseModalOpen && (
        <AddExpenseModal
          farmId={farmId}
          onClose={() => setExpenseModalOpen(false)}
          onAdded={(newExpense) => {
            setExpenses([newExpense, ...expenses]);
            setTotalExpenses(totalExpenses + newExpense.amount);
          }}
        />
      )}

      {saleModalOpen && (
        <AddSaleModal
          farmId={farmId}
          crops={crops || []}
          livestock={ livestock || []}
          onClose={() => setSaleModalOpen(false)}
          onAdded={(newSale) => {
            setSales([newSale, ...sales]);
            setTotalSales(totalSales + newSale.amount);
            setTotalOwed(totalOwed + (newSale.amount - newSale.amountPaid));
          }}
        />
      )}
    </div>
  );
};

export default FarmFinances;