import { NavLink } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineCog,
} from "react-icons/hi";

const items = [
  { name: "Dashboard", path: "/dashboard", icon: HiOutlineViewGrid },
  { name: "Products", path: "/products", icon: HiOutlineCube },
  { name: "Settings", path: "/settings", icon: HiOutlineCog },
];

export default function Sidebar({ onClose }) {
  return (
    <nav className="flex-1 px-4 py-6 space-y-1">
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <item.icon size={20} />
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}