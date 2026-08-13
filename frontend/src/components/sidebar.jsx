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
  Users
} from "lucide-react";
import { useLogout } from "../utils";
import { NavLink, Link, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "My Farms", icon: Sprout, path: "/farms" },
  { label: "Crops", icon: Leaf, path: "/crops" },
  { label: "Livestock", icon: PawPrint, path: "/livestock" },
  { label: "Diagnose Crop", icon: Camera, path: "/diagnose" },
  { label: "Advisory", icon: CloudSun, path: "/advisory" },
  { label: "Ask AI Assistant", icon: MessageCircle, path: "/askAIAssistant" },
  { label: "News & Tips", icon: Newspaper, path: "/news" },
  { label: "Community", icon: Users, path: "/comingSoon" },
];

const Sidebar = () => { 

  const navigate = useNavigate();

  return (
    <aside className="w-64 h-screen bg-gray-50 border-r border-gray-100 xl:flex hidden flex-col p-4 sticky top-0 left-0">

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
        <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
          <User size={18} />
          Profile
        </Link>
        <button 
        onClick={() => useLogout(navigate)}
        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
         >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
