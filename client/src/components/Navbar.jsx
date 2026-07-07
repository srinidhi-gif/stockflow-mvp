import { useAuth } from "../context/AuthContext";
import { HiOutlineLogout } from "react-icons/hi";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-6 bg-white border-b border-slate-200 shadow-sm">
      <span className="text-lg font-bold text-blue-600">StockFlow</span>

      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600 hidden sm:inline">
          {user?.email}
        </span>
        <button
          onClick={logout}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <HiOutlineLogout size={18} />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}