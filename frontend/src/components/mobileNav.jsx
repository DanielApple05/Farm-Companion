import {
  LayoutDashboard,
  Sprout,
  Leaf,
  PawPrint,
  MoreHorizontal,
  Camera,
  CloudSun,
  MessageCircle,
  Newspaper,
  Users,
  User,
  LogOut,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogout } from "../utils";

const mainNavItems = [
  {
    label: "Home",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    label: "Farms",
    icon: Sprout,
    path: "/farms",
  },
  {
    label: "Crops",
    icon: Leaf,
    path: "/crops",
  },
  {
    label: "Livestock",
    icon: PawPrint,
    path: "/livestock",
  },
];

const moreItems = [
  {
    label: "Diagnose",
    icon: Camera,
    path: "/diagnose",
  },
  {
    label: "Advisory",
    icon: CloudSun,
    path: "/advisory",
  },
  {
    label: "AI Assistant",
    icon: MessageCircle,
    path: "/askAIAssistant",
  },
  {
    label: "News & Tips",
    icon: Newspaper,
    path: "/news",
  },
  {
    label: "Community",
    icon: Users,
    path: "/comingSoon",
  },
];

const MobileNav = () => {
  const [moreOpen, setMoreOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    useLogout(navigate);
  };

  return (
    <>
      {/* More menu */}
      {moreOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 xl:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setMoreOpen(false)}
            className="absolute inset-0 bg-black/30"
          />

          {/* Bottom sheet */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-5 pb-8 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-semibold text-gray-900">
                  More
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  Farm tools and account
                </p>
              </div>

              <button
                onClick={() => setMoreOpen(false)}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {moreItems.map(({ label, icon: Icon, path }) => (
                <NavLink
                  key={label}
                  to={path}
                  onClick={() => setMoreOpen(false)}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center gap-2 py-4 rounded-xl border text-xs transition-colors ${isActive
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-gray-100 bg-gray-50 text-gray-600"
                    }`
                  }
                >
                  <Icon size={19} />
                  {label}
                </NavLink>
              ))}
            </div>

            {/* Account */}
            <div className="border-t border-gray-100 mt-5 pt-4 space-y-1">
              <NavLink
                to="/profile"
                onClick={() => setMoreOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
              >
                <User size={18} />
                Profile
              </NavLink>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 xl:hidden bg-white border-t border-gray-100 px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">

        <div className="grid grid-cols-5">
          {mainNavItems.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 py-1.5 text-[11px] transition-colors ${isActive
                  ? "text-green-600 font-medium"
                  : "text-gray-400"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`w-10 h-7 flex items-center justify-center rounded-full transition-colors ${isActive ? "bg-green-50" : ""
                      }`}
                  >
                    <Icon size={19} />
                  </div>

                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}

          {/* More */}
          <button
            onClick={() => setMoreOpen(true)}
            className={`flex flex-col items-center justify-center gap-1 py-1.5 text-[11px] transition-colors ${moreOpen
                ? "text-green-600 font-medium"
                : "text-gray-400"
              }`}
          >
            <div
              className={`w-10 h-7 flex items-center justify-center rounded-full ${moreOpen ? "bg-green-50" : ""
                }`}
            >
              <MoreHorizontal size={20} />
            </div>

            <span>More</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default MobileNav;