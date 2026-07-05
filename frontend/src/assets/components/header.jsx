import { Search, Sprout } from "lucide-react";

// Dummy user data (swap for real auth/user context later)
const user = {
  name: "Daniel",
  role: "Smallholder Farmer",
  avatarUrl: "", // add real photo URL later; falls back to initials below
};

const header = () => {
  const initials = user.name.charAt(0);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-8">
        <Sprout size={22} className="text-green-600" />
        <span className="font-semibold text-gray-900">Farm Companion</span>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      {/* Weather widget placeholder — plug in once the weather API is connected */}
      {/* <WeatherWidget /> */}

      {/* Profile */}
      <div className="flex items-center gap-3">
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-medium">
            {initials}
          </div>
        )}
        <div className="hidden sm:block text-sm">
          <p className="font-medium text-gray-900 leading-tight">{user.name}</p>
          <p className="text-xs text-gray-500 leading-tight">{user.role}</p>
        </div>
      </div>
    </header>
  );
}

export default header;
