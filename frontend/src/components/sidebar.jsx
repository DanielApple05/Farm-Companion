import { useState } from "react";
import {
  LayoutDashboard,
  Sprout,
  Leaf,
  PawPrint,
  Camera,
  CloudSun,
  MessageCircle,
  Newspaper,
  User,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

// ---- Nav config (swap `href` for real routes when wiring up React Router) ----
const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "My Farms", icon: Sprout, path: "/farms" },
  { label: "Crops", icon: Leaf, path: "/crops" },
  { label: "Livestock", icon: PawPrint, path: "/livestock" },
  { label: "Diagnose Crop", icon: Camera, path: "/diagnose" },
  { label: "Advisory", icon: CloudSun, path: "/advisory" },
  { label: "Ask AI Assistant", icon: MessageCircle, path: "/chat" },
  { label: "News & Tips", icon: Newspaper, path: "/news" },
];

const Sidebar = () => { 

  return (
    <aside className="w-64 min-h-screen bg-gray-50 border-r border-gray-100 flex flex-col p-4 sticky left-0">

      {/* Nav */}
      <nav className="flex-1 space-y-1 mt-20 ">
        {navItems.map(({ label, icon: Icon, path }) => {
          return (
            <NavLink
              key={label}
              to={path}
               reloadDocument
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive
                  ? "bg-green-50 text-green-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="pt-4 border-t border-gray-100 space-y-1">
        <a href="/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
          <User size={18} />
          Profile
        </a>
        <a href="/logout" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
          <LogOut size={18} />
          Logout
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
