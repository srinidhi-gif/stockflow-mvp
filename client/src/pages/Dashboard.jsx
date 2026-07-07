import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import DashboardCard from "../components/DashboardCard";
import Loader from "../components/Loader";
import {
  HiOutlineCube,
  HiOutlineCollection,
  HiOutlineCurrencyDollar,
  HiOutlineExclamationCircle,
  HiOutlineBan,
} from "react-icons/hi";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await api.get("/dashboard/overview");
      setData(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600 font-medium">{error}</p>
        <button
          onClick={fetchDashboard}
          className="mt-3 text-sm text-red-600 underline hover:text-red-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Overview of your inventory at a glance.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <DashboardCard
          title="Total Products"
          value={data.totalProducts}
          color="blue"
          icon={<HiOutlineCube size={24} />}
        />
        <DashboardCard
          title="Total Stock Units"
          value={data.totalStock.toLocaleString()}
          color="green"
          icon={<HiOutlineCollection size={24} />}
        />
        <DashboardCard
          title="Inventory Value"
          value={`$${Number(data.totalInventoryValue).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          color="purple"
          icon={<HiOutlineCurrencyDollar size={24} />}
        />
        <DashboardCard
          title="Low Stock Items"
          value={data.lowStockCount}
          color={data.lowStockCount > 0 ? "orange" : "green"}
          icon={<HiOutlineExclamationCircle size={24} />}
        />
      </div>

      {/* Out of stock count card */}
      {data.outOfStockCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <HiOutlineBan className="text-red-600" size={20} />
          </div>
          <div>
            <p className="font-semibold text-red-800">
              {data.outOfStockCount} product{data.outOfStockCount > 1 ? "s" : ""} out
              of stock
            </p>
            <p className="text-sm text-red-600 mt-0.5">
              These items need immediate restocking.
            </p>
          </div>
        </div>
      )}

      {/* Low stock table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Low Stock Items
          </h2>
          <Link
            to="/products"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            View All Products →
          </Link>
        </div>

        {data.lowStockProducts.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-slate-400">
              All products are sufficiently stocked.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                    Qty on Hand
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                    Threshold
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.lowStockProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                      {item.sku}
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-semibold text-slate-900">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-slate-500">
                      {item.lowStockThreshold}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.quantity === 0 ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                          Out of Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                          Low Stock
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}