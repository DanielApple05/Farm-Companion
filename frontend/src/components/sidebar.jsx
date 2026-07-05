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

// ---- Nav config (swap `href` for real routes when wiring up React Router) ----
const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "My Farms", icon: Sprout, href: "/farms" },
  { label: "Crops", icon: Leaf, href: "/crops" },
  { label: "Livestock", icon: PawPrint, href: "/livestock" },
  { label: "Diagnose Crop", icon: Camera, href: "/diagnose" },
  { label: "Advisory", icon: CloudSun, href: "/advisory" },
  { label: "Ask AI Assistant", icon: MessageCircle, href: "/chat" },
  { label: "News & Tips", icon: Newspaper, href: "/news" },
];

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");

  return (
    <aside className="w-64 min-h-screen bg-gray-50 border-r border-gray-100 flex flex-col p-4 top-24 fixed left-0">
  
      {/* Nav */}
      <nav className="flex-1 space-y-1 ">
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive = active === label;
          return (
            <a
              key={label}
              href={href}
              onClick={() => setActive(label)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-green-50 text-green-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon size={18} />
              {label}
            </a>
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
