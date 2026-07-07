import { useState, useEffect } from "react";
import api from "../services/api";
import { toast, ToastContainer } from "react-toastify";

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [defaultLowStock, setDefaultLowStock] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/settings");
      setSettings(res.data.settings);
      setDefaultLowStock(String(res.data.settings.defaultLowStock));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const value = Number(defaultLowStock);
    if (isNaN(value) || value < 0) {
      toast.error("Please enter a valid positive number");
      return;
    }

    try {
      setSaving(true);
      const res = await api.put("/settings", { defaultLowStock: value });
      setSettings(res.data.settings);
      toast.success("Settings saved");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ToastContainer />

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">
          Configure your organization preferences.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 max-w-xl">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-base font-semibold text-slate-900">
            Organization
          </h2>
        </div>

        <div className="p-6 space-y-5">
          {/* Org name (read-only) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Organization Name
            </label>
            <input
              type="text"
              readOnly
              value={settings?.name || ""}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 cursor-not-allowed"
            />
          </div>

          <form onSubmit={handleSave}>
            {/* Default low stock */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Default Low Stock Threshold
              </label>
              <input
                type="number"
                min="0"
                value={defaultLowStock}
                onChange={(e) => setDefaultLowStock(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <p className="text-xs text-slate-400 mt-1.5">
                Products without their own threshold will use this value to
                determine low stock status.
              </p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {saving ? "Saving…" : "Save Settings"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}