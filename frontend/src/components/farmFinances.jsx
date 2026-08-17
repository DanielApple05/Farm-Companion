import { useState, useEffect } from "react";
import { Wallet, Tag, PlusCircle, TrendingDown, TrendingUp, AlertCircle, Loader2, RefreshCw } from "lucide-react";
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

  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [saleModalOpen, setSaleModalOpen] = useState(false);

  const [financeErr, setFinanceErr] = useState("");
  const [loadingFinance, setLoadingFinance] = useState(false);


  const fetchFinances = async () => {
    setLoadingFinance(true)
    setFinanceErr("")
    try {
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
      setFinanceErr(error.response?.data?.message || "Failed to load finances");
    } finally {
      setLoadingFinance(false);
    }
  };

  useEffect(() => {
    if (farmId) fetchFinances();
  }, [farmId]);


  const netPosition = totalSales - totalExpenses;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-6">
      <h2 className="font-medium text-gray-900">Finances</h2>

      {/* Summary */}
      <>
        <div className="grid xl:grid-cols-3 grid-cols-1 gap-3">
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

        {/* Loading */}

        {loadingFinance && (
          <div className="grid p-3 space-y-3 ">
            <div className="grid items-center justify-between bg-gray-50 space-y-3 rounded-lg animate-pulse">
              <div className="flex flex-col gap-1.5">
                {/* description */}
                <div className="h-3.5 w-40 bg-gray-200 rounded-md" />
                {/* date */}
                <div className="h-3 w-20 bg-gray-200 rounded-md" />
              </div>
              <div className="flex items-center gap-2">
                {/* category badge */}
                <div className="h-5 w-16 bg-gray-200 rounded-md" />
                {/* amount */}
                <div className="h-3.5 w-14 bg-gray-200 rounded-md" />
              </div>
            </div>
            <div className="grid items-center justify-between bg-gray-50 rounded-lg space-y-3 animate-pulse">
              <div className="flex flex-col gap-1.5">
                {/* description */}
                <div className="h-3.5 w-40 bg-gray-200 rounded-md" />
                {/* date */}
                <div className="h-3 w-20 bg-gray-200 rounded-md" />
              </div>
              <div className="flex items-center gap-2">
                {/* category badge */}
                <div className="h-5 w-16 bg-gray-200 rounded-md" />
                {/* amount */}
                <div className="h-3.5 w-14 bg-gray-200 rounded-md" />
              </div>
            </div>
          </div>
        )}


        {/* Error */}
        {financeErr && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Tag
              size={24}
              className="text-gray-300"
            />

            <p className="text-sm text-gray-600 mt-2">
              {financeErr}
            </p>

            <button
              type="button"
              onClick={fetchFinances}
              className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-green-600 hover:text-green-700"
            >
              <RefreshCw size={13} />
              Try again
            </button>
          </div>)}

        {!loadingFinance && !financeErr && expenses.length > 0 &&
          <>
            {/* Expenses  */}
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
              {
                expenses.length === 0 && !loadingFinance && !financeErr && (
                  <p className="text-xs text-gray-400">No expenses logged yet.</p>
                )
              }
              < div className="space-y-2">
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

              {sales.length === 0 && !loadingFinance && !financeErr && (
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

          </>}

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
            crops={crops}
            livestock={livestock}
            onClose={() => setSaleModalOpen(false)}
            onAdded={(newSale) => {
              setSales([newSale, ...sales]);
              setTotalSales(totalSales + newSale.amount);
              setTotalOwed(totalOwed + (newSale.amount - newSale.amountPaid));
            }}
          />
        )}
      </>
    </div >
  );
};

export default FarmFinances;